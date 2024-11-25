---
title: python常用的命令备忘
date: 2024-03-27T00:00:00.000Z
author: KazooTTT
tags: []
finished: false
published: true
slug: commonly-used-command-memos-in-python
description: >-
  本文介绍了如何在当前环境下导出最小依赖以及配置Python包管理工具pip的镜像源。首先，通过安装`pipreqs`工具并使用命令`pipreqs ./
  --encoding=utf8`在项目根目录导出依赖。其次，讲解了如何在Windows系统中通过修改`pip.ini`文件或使用命令行配置pip的镜像源，包括设置镜像源地址、取消配置以及查看当前配置的方法。
category: 编程-后端-python
---

# Python常用的命令备忘

## 导出当前环境下的最小依赖

首先安装包

```shell
pip install pipreqs 
```

然后在环境根目录导出

```shell
pipreqs ./ --encoding=utf8
```

## 镜像源配置

在windows中，搜索pip.ini，去修改

或者使用命令行来配置

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

取消配置

```
pip config unset global.index-url
```

读取当前的配置：

```
pip config get global.index-url
```
