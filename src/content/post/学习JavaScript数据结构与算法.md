---
date created: '2023-01-16 00:05'
slug: learn-javascript-data-structures-and-algorithms
published: true
description: >-
  本内容涵盖了JavaScript数据结构与算法的学习，包括前端模块化的AMD实现（如requirejs）、TypeScript中的类型设置和接口概念、数据结构的基本操作（增删查改）、数组的操作方法（如push、pop、unshift、shift和splice），以及栈的数据结构特点（先进后出）。此外，还提供了TypeScript中数组操作的示例代码和相关图片链接。
tags:
  - 学习javascript
  - 数据结构与算法
  - 前端模块化
  - TypeScript
  - 数据结构模板
  - 数组
  - 栈
---

# 学习 JavaScript 数据结构与算法

## 前端模块化

```
AMD 异步模块定义，实现方式之一：requirejs(最流行)
```

## TypeScript

什么时候需要设置类型？

如果声明了一个变量但没有设置其初始值，推荐为其设置一个类型

接口  
[接口 · TypeScript 中文网 · TypeScript——JavaScript 的超集 (tslang.cn)](https://www.tslang.cn/docs/handbook/interfaces.html)

## 数据结构模板

增 创建  
删 删除  
查 查找  
改 修改

## 数组

增

```typescript
// 数据初始化
let array = []
// 在数组尾部插入
array.push(newEl)
array.push(newEl1, newEl2)
// 在数组头部插入
array.unshift(newEl)
```

删

```typescript
// 从数组末尾删除
array.pop()
// 从数组的开头删除
array.shift()
```

```ts
array.splice(5, 4) // 删除index=5开始的4个元素
```

![Pasted image 20230110210022](https://pictures.kazoottt.top/2024/04/20240407-0b36d51ffeff7c19f392744c5cd5858b.png)

![Pasted image 20230110211158](https://pictures.kazoottt.top/2024/04/20240407-c01f559e8d8097e5e5773cf42338283c.png)

## 栈

先进后出
