---
title: antd switch组件错误使用案例
date: 2024-10-12
author: KazooTTT
tags:
  - bug
finished: true
published: true
description: 
slug: antd-switch-component-misuse-example
category: 编程
---

# antd switch组件错误使用案例

在使用antd的[switch](https://ant-design.antgroup.com/components/switch-cn)的时候,我错误地使用了api

``` tsx
<Switch checked={mode === 1} onChange={handleModeChange} />
```

这里的onChange是cheked变化的时候触发的回调,如果想要切换Switch的时候触发回调,应该使用onClick，而不是onChange。

![](https://pictures.kazoottt.top/2024/10/20241012-3c8ddd04bc2a657d8a1a265e48b533fb.png)
