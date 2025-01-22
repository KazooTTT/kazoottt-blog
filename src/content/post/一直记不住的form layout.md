---
title: 一直记不住的form layout
date: 2023-10-17
author: KazooTTT
tags:
  - antdesign
published: true
slug: form-layout-that-i-cant-remember
description: >-
  本文讨论了在使用antd的Form组件时，如何理解和应用layout、labelCol和wrapperCol这几个关键属性。作者提到自己经常忘记这些属性的用法，因此撰写此文以学习和备忘。文章详细解释了这些属性的含义和在Form及Form.Item组件中的应用。
---

# 一直记不住的 form Layout

在使用 [antd 的 form 组件](https://ant.design/components/form) 的时候，需要进行排版，因此对于 Form 组件通常用到一下几个属性：

|             |      |           |
| ----------- | ---- | --------- |
| 属性\| 组件 | Form | Form.Item |
| layout      | ✅   |           |
| labelCol    | ✅   | ✅        |
| wrapperCol  | ✅   | ✅        |

但我对于这几个属性总是忘记怎么使用，因此写一篇博文来学习它的用法并且作为备忘。

## 属性的含义