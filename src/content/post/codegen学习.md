---
title: codegen学习
date: 2024-03-22
author: KazooTTT
tags: []
finished: false
published: true
slug: codegen-learning
description: >-
  AutoGen项目是一个编程框架，用于构建智能代理AI。它包括后端和前端两部分，后端使用Python实现，依赖于`pyproject.toml`文件，而前端与后端通过RESTful服务进行通信。项目提供了详细的安装指南和启动命令，使得开发者可以轻松地开始使用。此外，AutoGen还提供了示例代码和社区支持，方便用户学习和交流。
---

# Codegen 学习

官网地址 [AutoGen | AutoGen](https://microsoft.github.io/autogen/)

代码地址 [GitHub - microsoft/autogen: A programming framework for agentic AI. Join our Discord: https://discord.gg/pAbnFJrkgZ](https://github.com/microsoft/autogen)

## 从 samples 开始

![[IMG-20250104114646165.png]]

目前有三个 app，直接看第二个 autogen-studio

项目分为两个部分，一个是后端（autogen + restful 服务）一个是前端，前端与后端是通过 restful 来通信的。

## 后端

后端使用 python 实现，依赖文件在 `pyproject.toml`

如何安装依赖？

创建虚拟环境并 activate，然后输入一下命令，就会安装对应的依赖。

```shell
pip install -e .
```

启动命令：

```shell
autogenstudio ui --port 8081
```

## 后端 Autogen

## 后端 Restful 服务

## 前端