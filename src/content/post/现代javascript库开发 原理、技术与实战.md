---
title: 现代javascript库开发 原理、技术与实战
date: 2023-11-06
author: KazooTTT
tags: []
published: true
slug: modern-javascript-library-development-principles-techniques-and-practices
description: >-
  《现代JavaScript库开发：原理、技术与实战》是一本关于JavaScript库开发的书籍，内容涵盖了从零开始开发JavaScript库的原理、技术和实际操作。书中首先介绍了如何抽象设计项目功能，提取通用逻辑形成公共库，并强调了个人开发时应选择精简、功能专一的库以避免半途而废。此外，书中还详细讲解了深度优先遍历、变量判断方法、模块化构建流程以及依赖关系的处理，包括传统体系、Node.js体系和工具化体系的模块规范。书中还涉及了打包工具的使用，如webpack和rollup，以及如何通过这些工具实现模块的兼容性和优化。
---

# 现代 javascript 库开发 原理、技术与实战

[Site Unreachable](https://book.douban.com/subject/36162488/)

## 第 1 章 从零开发一个 JavaScript 库

可以对项目中的功能做抽象设计，然后提取通用的逻辑，形成公共的库  
迅速记录想法，时常回顾，选择合适的目标实现  
（个人开发的时候，尽量选择精简，功能专一的库，避免半途而废）

深拷贝 浅拷贝

深度优先遍历  
[图的深度优先遍历介绍 | 数据结构与算法 系列教程（笔记）](https://zq99299.github.io/dsalg-tutorial/dsalg-java-hsp/13/04.html#%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86%E7%AE%97%E6%B3%95%E6%AD%A5%E9%AA%A4)

判断 js 变量的方法  
toString

package mode  
cjs

## 第 2 章 构建

### 模块化

引入构建流程，兼容新老技术 ==> 稳定性

构建模块的规范  
原始（可以理解为函数）

[AMD.md](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)  
[CommonJS - Wikipedia](https://en.wikipedia.org/wiki/CommonJS)  
[GitHub - umdjs/umd: UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.](https://github.com/umdjs/umd)  
index.js

[Modules: ECMAScript modules | Node.js v21.1.0 Documentation](https://nodejs.org/api/esm.html)  
index.esm.js

### 依赖关系

对于库的开发者：

传统体系：

原始模块

nodejs 体系：

库需要支持的规范：commonjs/umd

工具化体系（例如构建工具 webpack rollup 等等）

库需要支持的规范：esm 和 commonjs

手动适配非常麻烦 ---> 解决方法：使用**打包工具**来完成

### 打包方案

![[IMG-20250104114646412.png]]  
aio  
all in one

webpack rollup

webpack4 才支持 scope hoisting 作用域提升  
之前因为函数不在同一个作用域，会出现很多冗余代码  
[ModuleConcatenationPlugin | webpack](https://webpack.js.org/plugins/module-concatenation-plugin/#root)

![[IMG-20250104114647137.png]]

兼容性  
用@babel/preset-env 转为 es5 的语法  
如果用了 es2015 的 api，那么还需要安装 polyfill，babel 已经内置了 corejs，直接安装@babel/plugin-transform-runtime 配置一下就可以
