---
title: Share My Incorrect Usage Cases of Zustand
date: 2024-12-17T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - zustand
  - selector
  - store
  - react-scan
  - 最小粒度原则
finished: true
published: true
category: 
slug: share-my-incorrect-usage-case-of-zustand
description: Zustand is a state management library that is simple and easy to use. It allows you to access the state via a single selector or shallow comparison to prevent unnecessary re-renders of all components. When the state is updated, you can use `useShallow` to retrieve only the required data. Additionally, you should follow the principle of minimal granularity, only fetching the necessary data instead of using multiple stores to manage different states. Moreover, state that is unrelated to the UI does not need to be accessed via a selector. The correct approach is to directly access the store within the `handleSave` method.
toAstro: true
---

## What is Zustand?

[Zustand](https://github.com/pmndrs/zustand) is a simple and easy-to-use state management library.

While using [react-scan](https://react-scan.com/), I noticed that when I updated a state in the store in component A, it caused a re-render of component B, leading to significant performance issues.

So, I revisited the documentation and realized that my previous usage of Zustand was incorrect.

## Mistake 1: Not using a single selector or shallow comparison to get state

Here’s the previous implementation and the corresponding component. `useGlobalStore` has more than just `uploadToServerProgress` and `uploadStatus` states.

```tsx
const ComponentA = () => {
  const { uploadToServerProgress, uploadStatus } = useGlobalStore();
  return (
    <UploadStateContainer
      uploadToServerProgress={uploadToServerProgress}
      uploadStatus={uploadStatus}
    />
  );
};
```

When `uploadToServerProgress` or `uploadStatus` is updated, `UploadStateContainer` re-renders (as expected). But when other states in `useGlobalStore` are updated, `UploadStateContainer` also re-renders (which is not expected).

This is because `const { uploadToServerProgress, uploadStatus } = useGlobalStore();` is shorthand for destructuring, which is equivalent to:

```tsx
const globalStore = useGlobalStore();
const { uploadToServerProgress, uploadStatus } = globalStore;
```

In React, any update to `globalStore` triggers a re-render of `UploadStateContainer`. Therefore, we need to modify it as follows:

### Solution 1: Use a single selector

```ts
const uploadToServerProgress = useGlobalStore(state => state.uploadToServerProgress);
const uploadStatus = useGlobalStore(state => state.uploadStatus);
```

### Solution 2: Use `useShallow`

```ts
const { uploadToServerProgress, uploadStatus } = useGlobalStore(useShallow(state => ({
  uploadToServerProgress: state.uploadToServerProgress,
  uploadStatus: state.uploadStatus,
})));
```

## Mistake 2: Not having sufficient granularity when using selectors

`cameraData` is obtained by subscribing to other services and contains data such as camera image and camera ID. The camera image is frequently updated data.

```tsx
import React from 'react';

export interface CameraData {
  cameraBase64: string; // base64 encoded image
  cameraId: number;
}

const CurrentCamera: React.FC = () => {
  const cameraData = useGlobalStore(state => state.cameraData);

  return <CurrentCameraId cameraId={cameraData.cameraId} />;
};
```

Though this is using a single selector, when `cameraBase64` updates, `cameraData` will also update, causing `CurrentCameraId` to re-render.

To solve this, follow the principle of minimal granularity and only fetch the required data:

```tsx
import React from "react";

export interface CameraData {
  cameraBase64: string; // base64 encoded image
  cameraId: number;
}

const CurrentCamera: React.FC = () => {
  const cameraId = useGlobalStore(state => state.cameraData.cameraId);

  return <CurrentCameraId cameraId={cameraId} />;
};
```

## Mistake 3: Using multiple stores to manage different states, instead of using slices to group states

In the official documentation [Flux-inspired practice - Zustand](https://zustand.docs.pmnd.rs/guides/flux-inspired-practice), it is mentioned that you should use a single store, not multiple stores for different states.

> **Recommended patterns**
> 
> **Single store**
> 
> Your application's global state should be located in a single Zustand store.
> 
> If you have a large application, Zustand supports splitting the store into slices.

## Mistake 4: Accessing UI-unrelated state via selectors

In a component, I had a `handleSave` method that called an API to save data.

Previously, I accessed the needed data through a selector within component A and then called the API to save it. But this was incorrect.

```tsx
const ComponentA = () => {
  const { state1, state2 } = useGlobalStore(
    useShallow(state => ({
      state1: state.state1,
      state2: state.state2,
    }))
  );

  const handleSave = () => {
    save(state1, state2);
  };

  return <SaveButton onClick={handleSave} />;
};
```

In component B, I changed `state1`, but since I accessed `state1` in component A, the change would cause component A to re-render.

The correct approach is to directly access the store inside the `handleSave` method instead of passing the state via selectors:

```tsx
const ComponentA = () => {
  const handleSave = () => {
    const { state1, state2 } = useGlobalStore.getState();
    save(state1, state2);
  };

  return <SaveButton onClick={handleSave} />;
};
```

## References

[Zustand](https://zustand-demo.pmnd.rs/)

[master branch notes/zustand learning notes](https://github.com/puxiao/notes/blob/master/zustand%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)

[How to efficiently manage React local state? This time I chose Zustand! | Bosh's Technical Exploration Notes](https://notes.boshkuo.com/docs/React/zustand#%E7%82%BA%E4%BD%95%E9%81%B8%E6%93%87%E4%BD%BF%E7%94%A8-zustand-)