---
title: 学习笔记 | 掘金小册【SSR 实战：官网开发指南】
date: 2022-10-29
author: KazooTTT
tags:
  - 前端
  - SSR
  - Next.js
slug: nuggets-booklet-ssr-practice-a-guide-to-official-web-development
published: true
description: >-
  This document provides a detailed guide on implementing Server-Side Rendering
  (SSR) for a website, focusing on the first five chapters of the "SSR
  实战：官网开发指南" from Juejin. It covers topics such as executing TypeScript files in
  Node.js using ts-node or Webpack, setting up nodemon for hot updates, and
  understanding the hydration process for client and server interactions.
  Additionally, it discusses troubleshooting common bugs and the process of
  fetching data on the server side. The author also reflects on the challenges
  faced during the learning process and the importance of not over-modifying
  working code.
---

# 掘金小册【SSR 实战：官网开发指南】

跟着掘金小册【SSR 实战：官网开发指南】实践的代码

（小册地址：<https://juejin.cn/book/7137945369635192836>）

内容：1-5 章，SSR 原理部分

![outline](https://pictures.kazoottt.top/2024/04/20240407-01e399d8f528eb920808fb7e54fccec8.png)

与此同时，感觉到在写代码的时候中英文切换有些打断节奏，所以想尝试文本、注释以及学习笔记也使用英文来写。

## 1. How to Execute Ts Files on Node

there's are two methods

1. using ts-node to run the ts file
2. using webpack to bundle the ts file, and the execute the bundled bundle.js file.

### 1.1 Ts-node

### 1.2 Webpack Bundle and Execute

[webpack core concepts](https://webpack.js.org/concepts/)

`pnpm install @babel/preset-env babel-loader ts-loader webpack webpack-merge webpack-cli --save-dev`

how to know what dependencies should be installed?

> [create app - webpack](https://createapp.dev/webpack)

how to add tsconfig.json

`tsc --init`

## 2. Nodemon - Hot Update

![image-20221015234533786](https://pictures.kazoottt.top/2024/04/20240407-15ae78352fc2914ed629f37eb669429a.png)

so we need to specify the watch list:

`npx nodemon --watch src server_build/bundle.js --ext tsx,ts`

## 3. Client and Server --- Hydrate

There are 3 steps to render a static page.

1. render template page
2. match the router
3. modify the html header

![sum up](https://pictures.kazoottt.top/2024/04/20240407-fdf09ebc90375a49a7d4a2ee0c1ef74f.jpg)

## 4. A Bug Leads to a More Serious Bug

1. ~~When I use axios, the console.log print these below:~~  
   ~~![screenshot](https://pictures.kazoottt.top/2024/04/20240407-18614e18b7d347bde50bcea00320d88c.png)~~  
   ~~It has told us the reason and how to fix, but it's just one module.~~  
   ~~We can add all polyfills with `node-polyfill-webpack-plugin`~~

   ~~[How to Polyfill node core modules in webpack 5]("https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5")~~

   ```javascript
   // webpack.config.js (we can add it to base config)
   const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
   module.exports = {
     // Other rules...
     plugins: [new NodePolyfillPlugin()],
   }
   ```

2. ~~argument entity must be string, Buffer, or fs.Stats~~  
   ~~It's a strange bug, I still don't know the real reason.~~  
   ~~![shot](https://pictures.kazoottt.top/2024/04/20240407-4f7965b630b4aa09815ee46aed3820d8.jpg)~~  
   ~~<https://github.com/ionic-team/ionic-cli/issues/598> ==> it does not works for me.~~

---

### 2022-10-26 Finally Fixed it

After I did these above, my program cannot run correctly.And finally I find the true reason is that I installed the node polyfill.

It got me think about the joke——don't modify the codes when the program can run successfully.

## 5. How to Fetch the Data

We realize the static page render by using ssr before. How should we fetch data? There are two ways:

1. on the cilient side, it's common and esay.
2. on the server side, that is what we learn below.

fetch data on the server side ==> global data transfer ==>the client side

It's difficult for me to understand the chapter 6, I'll look back to this later.
