---
title: html | 浏览器滚动恢复属性History.scrollRestoration
date: 2022-11-27T00:00:00.000Z
author: KazooTTT
tags:
  - history
  - html
  - scrollRestoration
  - 前端
  - 页面滚动
slug: browser-scroll-restoration-property-historyscrollrestoration
published: true
description: >-
  在React新版官网的代码中，发现了一个名为History.scrollRestoration的属性，用于控制页面刷新或返回后是否恢复到原来的滚动位置。该属性有两个值：'auto'表示自动恢复到用户滚动到的位置，而'manual'则表示不恢复，用户需手动滚动到该位置。在React官网的实现中，针对Safari浏览器设置了'auto'，而其他浏览器则使用'manual'，以优化不同浏览器的用户体验。这一设置有助于避免在Safari浏览器中出现返回时的灰色屏幕问题，同时确保其他浏览器如Chrome和Firefox的用户体验。
NotionID-notionnext: 7dc13064-8325-4aa3-bf45-5450c89e0223
link-notionnext: >-
  https://kazoottt.notion.site/History-scrollRestoration-7dc1306483254aa3bf455450c89e0223
rinId: 21
finished: true
category: 编程
---

## 后续 2024-05-23

后来发现我被注释给欺骗了，虽然\_app.tsx里面说让nextjs设置scrollRestoration为manual，但是其实他们的项目中nextjs的scrollRestoration就是true。

与之前的注释不符...

```tsx
useEffect(() => {
  // 取自StackOverflow。试图检测Safari桌面版和移动版。
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  if (isSafari) {
    // 这有点不真实。
    // 我们仍然依赖手动的Next.js滚动恢复逻辑。
    // 但是，我们*也*不希望在Safari的回退滑动手势期间出现灰屏。
    // 看起来启用自动恢复和Next.js逻辑同时使用似乎没有坏处。
    history.scrollRestoration = "auto"
  } else {
    // 对于其他浏览器，让Next.js将scrollRestoration设置为'manual'。
    // 这似乎对Chrome和Firefox更有效，因为它们没有动画回退滑动。
  }
}, [])
```

![Pasted image 20240523112741](https://pictures.kazoottt.top/2024/05/20240523-fada302d05227c093278498fd1a41b16.png)![Pasted image 20240523112936](https://pictures.kazoottt.top/2024/05/20240523-e452f6186dff475a25570f749111141e.png)

[Re-enable scroll restoration behind flag (#14046) · vercel/next.js@38bd1a0 · GitHub](https://github.com/vercel/next.js/commit/38bd1a024cb25923d8ea15f269a7294d073684d8)

# 浏览器滚动恢复属性History.scrollRestoration

[GitHub - reactjs/react.dev: The React documentation website](https://github.com/reactjs/react.dev)

最近在阅读 React 新版官网的代码时，发现在[\_app.tsx](https://github.com/reactjs/reactjs.org/blob/main/beta/src/pages/_app.tsx)中有这样一段代码。

```typescript
useEffect(() => {
  // Taken from StackOverflow. Trying to detect both Safari desktop and mobile.
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  if (isSafari) {
    // This is kind of a lie.
    // We still rely on the manual Next.js scrollRestoration logic.
    // However, we *also* don't want Safari grey screen during the back swipe gesture.
    // Seems like it doesn't hurt to enable auto restore *and* Next.js logic at the same time.
    history.scrollRestoration = "auto"
  } else {
    // For other browsers, let Next.js set scrollRestoration to 'manual'.
    // It seems to work better for Chrome and Firefox which don't animate the back swipe.
  }
}, [])
```

这里用到了我没有接触过的一个属性 History.scrollRestoration，发现这个属性是用来控制页面刷新或者返回后是否滚动到原来的位置。

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration)

属性的值：

1. auto 将恢复用户已滚动到的页面上的位置。
2. manual 未还原页上的位置。用户必须手动滚动到该位置。

在 mdn 文档中没有看到 auto 是默认值，但是自己手动验证以及在[google blog](https://developer.chrome.com/blog/history-api-scroll-restoration) 中提到：

> The good news is, however, that there's a potential fix: history.scrollRestoration. It takes two string values: auto, which keeps everything as it is today (and is its default value), and manual, which means that you as the developer will take ownership of any scroll changes that may be required when a user traverses the app's history.

所以 auto 确实是默认值没错。

## 举例

1. 如果 history.scrollRestoration = 'auto'; 自动回到原有位置。
   ![](https://pictures.kazoottt.top/2024/04/20240407-7667c40d30dd5df692f894b63de0e395.gif)

2. 如果 history.scrollRestoration = 'manual'; 回到顶部。
   ![](https://pictures.kazoottt.top/2024/04/20240407-cf4eabae0c082ae50dc617ae67e140d8.gif)

## 在 react.dev (新版官网)中为什么要使用 manual

这是因为这个项目用的 next.js，涉及到 ssr，可能出现页面还没渲染完就滚动到了之前的位置。（待补充例子。）

可以看一下这篇文档[Next.js 中怎么保持页面的滚动位置](https://juejin.cn/post/7141235243326898213)
