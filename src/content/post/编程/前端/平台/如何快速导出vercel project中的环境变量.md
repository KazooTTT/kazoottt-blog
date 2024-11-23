---
title: 如何快速导出vercel project中的环境变量
date: 2024-02-23
author: KazooTTT
tags:
  - vercel
finished: true
published: true
slug: how-to-quickly-export-environment-variables-in-vercel-project
description: >-
  本文介绍了如何在Vercel中集成插件或链接数据库后，快速导出环境变量的方法。首先，需要全局安装Vercel，然后通过命令链接Vercel账户，并拉取环境变量到本地的.env.local文件中。这一过程简化了环境变量的管理，提高了开发效率。
rinId: 3
category: 编程-前端-平台
---

# 如何快速导出vercel Project中的环境变量

![Pasted image 20240223222337](https://pictures.kazoottt.top/2024/02/20240223-45a401aedb0bd0b7e4a1bc708cc368a9.png)我在vercel中集成了某些插件或者链接了数据库，要如何快速的导出这些环境变量呢？

具体方法如下：

``` shell
npm i -g vercel

vercel link

vercel env pull .env.local
```

1. 首先是安装vercel
2. 然后登录vercel ![Pasted image 20240223222531](https://pictures.kazoottt.top/2024/02/20240223-d958cd13a2bb101e2c056074826d1f37.png)
3. 最后拉取环境变量到.env.local
   ![Pasted image 20240223222605](https://pictures.kazoottt.top/2024/02/20240223-da07828b4f8288c2015ae659271c8b06.png)
