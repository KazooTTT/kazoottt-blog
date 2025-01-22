---
title: CSS | 随用随记
date: 2022-11-15
author: KazooTTT
tags:
  - css
  - 前端
  - 刷题
slug: css-on-the-go
published: true
description: >-
  本文介绍了CSS中的一些关键技巧，包括使用伪类选择器来设置HTML模块中特定li标签的背景颜色，以及如何为div元素添加后伪元素并设置其样式。此外，还讨论了浮动和清除浮动的概念，并提供了一个实际的编程练习链接，帮助读者更好地理解和应用这些CSS技术。
---

# CSS 随用随记

## 1. 请将 Html 模块中 Ul 列表的第 2 个 Li 标签和第 4 个 Li 标签的背景颜色设置成 "rgb(255, 0, 0)"

关键词：伪类选择器

```css
ul li:nth-child(2n) {
  background: rgb(255, 0, 0);
}
```

![image-20221115233947891](https://pictures.kazoottt.top/2024/04/20240407-5e745e9abfb757513c8b6853b98262b7.png)

## 2. 请给 Html 模块的 Div 元素加一个后伪元素，且后伪元素的宽度和高度都是 20px，背景颜色为 "rgb(255, 0, 0)"

![image-20221115234139207](https://pictures.kazoottt.top/2024/04/20240407-1b6d680284da37bc6bcb8014e8ffe0e0.png)

## 3. [浮动和清除浮动*牛客题霸*牛客网 (nowcoder.com)](https://www.nowcoder.com/practice/88bcbaee954349f5a8810bfa94ee61a8?tpId=260&tqId=2200196&ru=%2Fexam%2Foj&qru=%2Fta%2Ffront-quick-study%2Fquestion-ranking&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3DHTML%2FCSS%26topicId%3D260)

请将类为 "left" 的 div 元素和类为 "right" 的 div 元素在同一行上向左浮动，且清除类为 "wrap" 的父级 div 元素内部的浮动。

关键词：清除浮动

TODO:

<a href='/2022/11/15/清除浮动/'>CSS | 清除浮动</a>
