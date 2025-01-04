---
title: react-scan的用法
date: 2024-12-17T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - react-scan
  - devtool
  - components
  - re-render
  - performance优化
finished: true
published: true
category: 前端
slug: react-scan
description: >-
  react-scan 是一个用于查看 React 代码中的 re-render
  信息的工具。安装方式可以分为开发环境安装和使用浏览器插件两种，后者允许自定义配置。使用 react-scan 的时候，可以看到当前元素的
  props、context 和 state，以及是否发生了 re-render，并且会标记出可能存在性能优化问题的 bad render。
toAstro: true
---

在本地运行 follow 的源代码的时候是我第一次接触到 react-scan, 后来又在 x 的首页山上面刷到了原作者以及其他人对于 [react-scan](https://react-scan.com/) 的推荐。

下面来介绍一下它的用法，以及我个人认为它好用的原因。

## 安装

安装方式可以分为两种，开发环境安装，使用浏览器插件。[官方文档](https://github.com/aidenybai/react-scan?tab=readme-ov-file#install) 有比较详细的教程，这里不做赘述。

如果通过 npm 安装，可以自定义更多的配置，可以参考这里的 [API Reference](https://github.com/aidenybai/react-scan?tab=readme-ov-file#api-reference-1)

## 使用

react-scan 有三个按钮

1. 是否查看元素的开关
2. 是否查看 re-render 的开关
3. 是否开启声音的开关

<img src="https://pictures.kazoottt.top/2024/12/20241217-f7e2b39db39e5cbf21c0efc0e08656aa.png"/>

### 开启元素查看

会在面板上显示当前的元素，以及它的 props,context,state。

如果发生变化，会变为紫色，这样可以方便你排查是什么值的变化导致了 re-render。

在某些元素的 props 中会显示一个⚠️警告标志（isBadRender），提醒开发者这里可能存在性能优化的空间

``` ts
const isBadRender =
    isChanged &&
    ['object', 'function'].includes(typeof lastValue) &&
    fastSerialize(lastValue) === fastSerialize(contextObj[key]);
```

为什么情况下会出现：

- 组件发生了重新渲染（isChanged 为 true）
- 变化的值是对象或函数类型（['object', 'function'].includes(typeof lastValue)）
- 但是当我们序列化新旧值时，它们是完全相同的（fastSerialize(lastValue) === fastSerialize(contextObj[key])）

### 开启 re-render 查看

会显示当前的 re-render 的次数，以及每个 re-render 的组件。

## 为什么觉得好用

虽然 devtool 也可以查看 re-render 的情况，但是 react-scan 把 component 的 props,context,state 都显示出来并且标记了 bad render,让问题的排查更加方便。

并且 react-scan 自带面板，不需要像 devtool 一样首先需要打开 devtool 再勾选上 re-render 的画面闪烁监听。

![image.png](https://pictures.kazoottt.top/2024/12/20241217-1db17bd2dcccf168976cdc833df6f6a3.png)

## 参考

[还有这种前端技巧？REACT-SCAN 代码鉴赏｜精简版\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1JrzvYgERi/)