---
title: momentjs的format string大小写导致的问题
date: 2023-09-28
author: KazooTTT
tags: []
published: true
slug: problems-caused-by-format-string-case-in-momentjs
description: >-
  在使用antd的TimePicker组件时，通过传入format参数来控制时间显示格式。然而，momentjs的format
  string的大小写使用可能导致显示问题，需要特别注意。
---

# Momentjs 的 format String 大小写导致的问题

## 一、起因

在使用 antd 的 [TimePicker 组件](https://ant.design/components/time-picker-cn) 的时候，可以传入 format 来控制展示的时间格式。

![[IMG-20250104114646201.png]]
