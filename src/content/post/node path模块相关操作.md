---
title: node | path模块相关操作
subtitle: 记录一些常用用法和区别，以及犯的错。
date: 2022-10-24
author: KazooTTT
tags:
  - path
  - 前端
  - node
slug: node-path-module-related-operations
published: true
description: >-
  本文介绍了Node.js中path模块的常用操作，包括__dirname与process.cwd()的区别，以及path.join()和path.resolve()的差异。特别指出，__dirname和process.cwd()在使用时需注意其返回的路径差异，以免导致静态资源加载失败。同时，path.join()用于连接路径，而path.resolve()则解析为绝对路径。这些知识点对于正确配置和处理文件路径至关重要。
category: 前端
toAstro: true
---

# Path 相关操作

path 是 node 的一个常用模块。

## 常用用法

TODO

## 区别

1. \_\_dirname 和 process.cwd() 的区别

   [node.js - What's the difference between process.cwd() vs \_\_dirname? - Stack Overflow](https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname)

   ![image-20221024194858508](https://pictures.kazoottt.top/2024/04/20240407-b69c9109c55cd58f0f5920723ff9cb51.png)

   此段代码意在配置静态资源路径，由于错误使用\_\_dirname，导致静态资源加载失败。

   ```
   xxx/server_build/client_build // 前者返回
   xxx/client_build // 后者返回
   ```

   ![image-20221024195247050](https://pictures.kazoottt.top/2024/04/20240407-f029c7528e83b5f3cb61c09adc67d4d2.png)

   而目录结构为上图，express- 对应 server 打包在 server_bulid,需要加载的 client scripts 在 client_buiild，为同级目录，所以第一张图右边的写法才能正确配置静态资源路径。

2. path.join() 和 path.resolve() 的区别

   连接路径

   path.resolve() ==> 解析为绝对路径
