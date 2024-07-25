---
title: __dirname is not defined in ES module scope
date: 2024-05-29T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - nodejs
  - 前端
  - esm
  - module
finished: true
published: true
category: 编程与技术
slug: dirname-is-not-defined-in-es-module-scope
NotionID-notionnext: 543bfc66-a416-4704-92be-9a93fed191a8
link-notionnext: >-
  https://kazoottt.notion.site/__dirname-is-not-defined-in-ES-module-scope-543bfc66a416470492be9a93fed191a8
rinId: 14
---

# __dirname Is not Defined in ES Module Scope

在package.json中的type = module的项目中，我创建了一个ts文件，类型是esm的类型。

这里的报错是因为我们错误的使用了module的语法到esm的文件中，要解决这个问题的方法有两种，第一种改为module，另一种是改为esm的写法。

首先是第一种改为module的写法，那就是把import改为require，然后由于我们这里是module的项目，所以需要修改一下ts文件的后缀ts改为cts。

一个供参考的例子：[GitHub - shawnsparks/typescript-esm: Explore different usage patterns of ES modules with Typescript](https://github.com/shawnsparks/typescript-esm)

然后是第二种，文件、路径相关的改为esm的写法。

```ts
import { fileURLToPath } from "url"
import path from "path"

// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```
