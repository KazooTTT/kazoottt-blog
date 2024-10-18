---
title: npm和npx的区别
date: 2023-09-06
author: KazooTTT
finished: false
published: true
slug: difference-between-npm-and-npx
description: >-
  本文详细介绍了npm和npx的区别，包括它们的定义、使用场景和具体用法。npm是Node.js的默认包管理器，用于安装、卸载和升级包，而npx是一个命令行工具，允许用户直接运行项目中的二进制文件，无需全局安装。文章通过实例说明了两者在实际开发中的应用，如使用npm安装ant
  design，以及使用npx创建nextjs项目。
category: 前端
---

# Npm和npx的区别

在日常的开发中，经常会使用这两个指令。

例如使用 npm 引入 ant design

```shell
npm install antd
```

[Create Next App | Next.js (nextjs.org)](https://nextjs.org/docs/api-reference/create-next-app) 中运行使用 npx 来创建 nextjs 项目

```shell
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

本文将从两者的定义、区别、使用场景这三个部分进行阐述。

## Npm 和 Npx 的定义

开宗明义，首先需要弄清楚 npm 和 npx 的定义以及它们具体是用来做什么的。

### Npm 的定义

我从书籍或者网站中找了一些关于 npm 的定义。例如在《JavaScript 高级程序设计 4th》，作者对 npm 的定义如下：

> npm，即 Node 包管理器（Node Package Manager），是 Node.js 运行时默认的包管理器。在 npm 仓库中发布的第三方包可以指定为项目依赖，并通过命令行本地安装。npm 仓库包含服务端和客户端 JavaScript 库。
> npm 是为在服务器上使用而设计的，服务器对依赖大小并不敏感。在安装包时，npm 使用嵌套依赖树解析所有项目依赖，每个项目依赖都会安装自己的依赖。这意味着如果项目依赖三个包 A、B 和 C，而这三个包又都依赖不同版本的 D，则 npm 会安装包 D 的三个版本。

在 freecodecamp 的技术分享博客（[什么是 npm —— 写给初学者的编程教程 (freecodecamp.org)](https://www.freecodecamp.org/chinese/news/what-is-npm-a-node-package-manager-tutorial-for-beginners/)）中，作者对 npm 的定义如下：

> npm（“Node 包管理器”）是 JavaScript 运行时 Node.js 的默认程序包管理器。
> npm 由两个主要部分组成:
> 
> 1. 用于发布和下载程序包的 CLI（命令行界面）工具
> 2. 托管 JavaScript 程序包的  [在线存储库](https://www.npmjs.com/)

---

也就是说 npm 的本质是包管理器。

如何管理包？

对于本地，使用 CLI 进行包的安装，卸载、升级  
对于 npm 存储库，使用 CLI 进行将包发布到存储库中  
包从何而来？

npm 存储库 <=== 他人使用 CLI 进行将包发布到存储库中

很显然在本文开头 npm 命令其实代指的命令行工具，而不是包管理器这个概念本身。

综上，提到 npm 的时候可能有两个定义，一个是包管理器（本身的定义），一个是包管理器对应的命令行工具（使用过程中代指的定义）。

### Npx 的定义

在[什么是 npm —— 写给初学者的编程教程 (freecodecamp.org)](https://www.freecodecamp.org/chinese/news/what-is-npm-a-node-package-manager-tutorial-for-beginners/) 中提到

> 最新引入的  [npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/)   使我们可以像在全局安装程序一样运行这些  `node_modules`   项目作用域命令，方法是在其前面加上  `npx ...`（即`npx prettier --write ** / *。ts`）。

## 用法

[npx 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/02/npx.html)

如果要运行项目中的某些二进制文件，以前只能使用 路径/bin 文件 来执行  
但是使用 npx 就可以直接运行了

> npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。由于 npx 会检查环境变量`$PATH`，所以系统命令也可以调用。
