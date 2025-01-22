---
title: CommonJS简介
date: 2023-10-17
author: KazooTTT
tags:
  - commonjs
  - JavaScript
  - node
published: true
slug: introduction-to-commonjs
description: >-
  CommonJS是一种模块规范，主要用于Node.js服务器端JavaScript应用程序。它通过`require`函数导入模块，通过`module.exports`或`exports`导出模块内容。在`package.json`文件中，通过设置`"type"`字段为`"commonjs"`来指定模块格式。CommonJS不支持浏览器环境，是Node.js中模块管理的基础。
---

# CommonJS 简介

## 什么是 Commonjs

commonjs 是 module 的一种类型（规范）

## 使用场景

> CommonJS is mainly used in server-side JS apps with Node, as browsers don't support the use of CommonJS.

CommonJS 主要用于带有 Node 的服务器端 JS 应用程序，因为浏览器不支持使用 CommonJS。

## 如何使用

### package.json

> The "type" field defines the module format that Node.js uses for all .js files that have that package.json file as their nearest parent.

`"type"`  字段定义 Node.js 用于所有将该  `package.json`  文件作为其最近父级的  `.js`  文件的模块格式。

在 package 中不需要显示定义 type(type 的可选项是 commonjs 和 module)，一般是需要用到 ESM 的时候才去定义 module。

package 的影响范围是当前文件夹以及子文件夹的所有 js 文件。（ts 会被 ts 编译器转化为 js 代码）

### 语法

导入：require 导出：module.exports

举个例子：

```jsx
// 导出两个函数
exports.add = function (a, b) {
  return a + b
}

exports.multiply = function (a, b) {
  return a * b
}
```

```jsx
// 引入 math 模块
var math = require("./math")

// 使用 math 模块中的函数
var sum = math.add(5, 3)
var product = math.multiply(4, 6)

console.log("Sum:", sum)
console.log("Product:", product)
```

---

批量导入导出：

```jsx
// 定义多个实用函数
function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

// 将这些函数添加到一个对象中并导出该对象
module.exports = {
  add,
  subtract,
}
```

```jsx
// main.js

// 引入 utils 模块
var utils = require("./utils")

// 使用 utils 模块中的函数
var sum = utils.add(5, 3)
var difference = utils.subtract(8, 2)

console.log("Sum:", sum)
console.log("Difference:", difference)
```

---

参考：
