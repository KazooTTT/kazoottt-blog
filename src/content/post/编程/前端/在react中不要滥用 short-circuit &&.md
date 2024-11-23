---
title: 在react中不要滥用 &&
date: 2024-10-16
author: KazooTTT
tags:
  - bug
  - react
  - jsx
  - short-circuit
  - 前端
finished: true
published: true
description: 在React中使用短路运算符（&&）时，0 会被错误地渲染为内容。通过避免使用 && 判断数字，特别是可能为 0 的值，可以确保正确的内容显示，例如显示 0号相机 而非仅仅显示 0。
slug: do-not-misuse-short-circuiting-in-react
category: 编程
NotionID-notionnext: 12b55568-fd75-815c-ba9c-ff587a86a262
link-notionnext: https://kazoottt.notion.site/react-short-circuit-12b55568fd75815cba9cff587a86a262
---

## 错误现象

代码如下：

``` jsx
{camera_id && (
  <div>{camera_id}号相机</div>
)}
```

当camera_id>0的时候，正常显示x号相机

当camera_id=0的时候，**异常**显示0,而不是0号相机

## 错误原因

这是因为在 JavaScript 中，`0` 被视为 falsy 值，因此当 `camera_id` 为 `0` 时，条件判断 `camera_id &&` 会返回 `false`。所以后面的内容不被渲染。

但是0是可以被react渲染的，所以最后显示的是0，而不是不显示。

## 解决方法

涉及到数字且可能为0的时候，不要直接使用&&来判断，而是使用

``` jsx
{camera_id !== undefined && (
  <div>{camera_id}号相机</div>
)}
```

## 参考

[reactjs - React showing 0 instead of nothing with short-circuit (&&) conditional component - Stack Overflow](https://stackoverflow.com/questions/53048037/react-showing-0-instead-of-nothing-with-short-circuit-conditional-component)