---
title: 运行npm run tsc报错
date: 2024-10-15T00:00:00.000Z
author: KazooTTT
tags:
  - bug
finished: true
published: true
description: null
slug: npm-run-tsc
category: 编程-前端
---

## 错误现象

``` bash
> npm run lint:js && npm run prettier && npm run tsc

Checking formatting...
All matched files use Prettier code style!
npm error Missing script: "tsc"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\turbo\AppData\Local\npm-cache\_logs\2024-10-12T06_30_22_873Z-debug-0.log
 ELIFECYCLE  Command failed with exit code 1.
```

## 错误原因

虽然安装了tsc但是这里的写的是npm run tsc，也就是说package.json的script中的需要有tsc

## 解决方法

在package.json中添加：

```
 "scripts": {
    "tsc": "tsc"
  },
```

如果有其他的配置需求可以在后面添加，例如

```
 "scripts": {
    "tsc": "tsc --noEmit"
  },
```
