---
title: how to find the repeated number of an array?
date: 2024-05-06
author: KazooTTT
type: Post
status: Draft
tags:
  - javascript
  - array
  - map
  - object
finished: true
published: true
slug: how-to-find-the-repeated-number-of-an-array
description: >-
  This TypeScript function `findTheNumber` uses a Map to store and check for the
  presence of numbers in an array. It utilizes the `find` method to locate the
  first number that has already been encountered in the array, using the Map to
  track seen numbers. The difference between a Map and an Object in JavaScript
  is that a Map allows keys of any type, while Object keys are limited to
  strings or symbols, and a Map maintains the order of insertion. The `find`
  method is used to retrieve the first element in an array that satisfies a
  given condition.
NotionID-notionnext: 3e3d3c62-203d-4771-a708-ad8d6c04b992
link-notionnext: >-
  https://kazoottt.notion.site/how-to-find-the-repeated-number-of-an-array-3e3d3c62203d4771a708ad8d6c04b992
rinId: 48
---

# How to Find the Repeated Number of an Array

```typescript
const findTheNumber = (array: number[]) => {
  const dict = new Map()
  return array.find((item) => {
    if (dict.has(item)) {
      return item
    } else {
      dict.set(item, true)
    }
  })
}
```

## 1. What is the Difference between Map and Object?

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps>

1. the key of the map can be any type, but the key of the object only can be **string** or **symbol**.
2. the map has order.

> The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

## 2. How to Get the Target Item from a Array?

use the `find` api of the Array `Array.prototype.find()`

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find>

> The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

how to use:

```typescript
// find the first item that can be divided by 2（even）
const array = [1, 2, 3, 4]
const target = array.find((item) => {
  return item / 2 === 0
})
```
