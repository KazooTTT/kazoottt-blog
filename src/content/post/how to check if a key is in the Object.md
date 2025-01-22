---
title: how to check if a key is in the Object
date: 2024-05-06
author: KazooTTT
type: Post
status: Published
tags:
  - javascript
  - Object
finished: true
published: true
category: 随手记
slug: how-to-check-if-a-key-is-in-the-object
description: >-
  This document explains two methods to check if a property exists in a
  JavaScript object: the `in` operator and the `hasOwnProperty` method. The `in`
  operator returns `true` if the specified property is in the object or its
  prototype chain, and it requires the property name to be a string. The
  `hasOwnProperty` method also checks for property existence, specifically
  within the object itself, not its prototype chain, and it also requires the
  property key to be a string. Both methods are demonstrated with examples.
NotionID-notionnext: 196ff681-16d8-47f1-a3d1-15a87b02aa5f
link-notionnext: >-
  https://kazoottt.notion.site/how-to-check-if-a-key-is-in-the-Object-196ff68116d847f1a3d115a87b02aa5f
rinId: 47
---

# How to Check if a Key is in the Object

there are many methods.

## `in` Operator

[in - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)

> The **`in`** operator returns `true` if the specified property is in the specified object or its prototype chain.

how to use?

for example:

```javascript
const dict = { a: "a", b: "b" }
console.log("a" in dict)
```

attention: the attribute name should be string.

that is to say:

- a in dict ❎
- "a" in dict ✅

## Object API: hasOwnProperty

[Object.prototype.hasOwnProperty() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

The complete expression is `Object.prototype.hasOwnProperty()`.

how to use it ?

```javascript
const dict = {
  a: "a",
  b: "b",
}
console.log(dict.hasOwnProperty("a"))
```

the same is the attribute key should be a string.

- a in dict ❎
- "a" in dict ✅
