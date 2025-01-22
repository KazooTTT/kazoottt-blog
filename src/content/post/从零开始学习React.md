---
title: 从零开始学习React
date: 2023-09-06
author: KazooTTT
finished: false
published: true
slug: learning-react-from-scratch
description: >-
  本文介绍了React学习的基础知识，包括状态的定义和useMemo与useCallback的区别。状态是React中一个重要的概念，它不是静态的，不依赖于props，也不能通过现有的props或状态计算得出。文章还解释了useMemo和useCallback在React中的应用，指出useCallback的主要优势在于避免编写额外的嵌套函数，两者在功能上是等价的。
tags:
  - 从零开始学习React，状态，memo和useCallback
---

# 从零开始学习 React

自己对于 react 还是只停留在使用层面，这是远远不够的。

什么是状态

1. 不会随着时间推移保持不变
2. 不是从 props 传进来的
3. 不能根据现在有的 props 或者状态把它给计算出来

useMemo 和 useCallback 的区别  
The two examples above are completely equivalent. The only benefit to `useCallback` is that it lets you avoid writing an extra nested function inside. It doesn’t do anything else. [Read more about `useCallback`.](https://react.dev/reference/react/useCallback)  
上面的两个例子是完全等价的。`useCallback` 的唯一好处是它可以让您避免在内部编写额外的嵌套函数。它没有做任何其他事情。了解有关 `useCallback` 的更多信息。
