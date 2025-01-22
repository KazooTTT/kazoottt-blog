---
title: convert list like into list
date: 2024-06-03
author: KazooTTT
type: Post
status: Draft
tags: []
finished: true
published: true
slug: convert-list-like-into-list
rinId: 70
description: 如何使用 NodeList 转换为 Array 进行 map 操作
---

# Convert List like into List

```js
document.querySelectorAll(".dir-item").map((item) => item.innerText)
```

The error `document.querySelectorAll(...).map is not a function` occurs because `querySelectorAll` returns a `NodeList`, which is not an Array and does not have the `map` method. To solve this, you can convert the `NodeList` to an Array using one of the following methods:

1. **Spread Operator**

```javascript
const items = [...document.querySelectorAll(".dir-item")]
const itemTexts = items.map((item) => item.innerText)
```

1. **Array.from()**

```javascript
const items = Array.from(document.querySelectorAll(".dir-item"))
const itemTexts = items.map((item) => item.innerText)
```

1. **Array.prototype.slice.call()**

```javascript
const items = Array.prototype.slice.call(document.querySelectorAll(".dir-item"))
const itemTexts = items.map((item) => item.innerText)
```

After converting the `NodeList` to an Array, you can then use the `map` method to get the `innerText` of each element.

Here's an example using the spread operator:

```javascript
const itemTexts = [...document.querySelectorAll(".dir-item")].map((item) => item.innerText)
console.log(itemTexts)
```

This will give you an array of the text content of each element with the class `dir-item`.
