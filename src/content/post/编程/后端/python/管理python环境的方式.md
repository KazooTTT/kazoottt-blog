---
title: 管理python环境的方式
date: 2023-12-05
author: KazooTTT
tags:
  - python
  - 环境管理
  - pyenv
  - poetry
  - conda
published: true
slug: managing-the-python-environment
description: >-
  本文总结了管理Python环境的几种主流方式，包括venv、virtualenv、conda、pipenv和poetry等。虚拟环境能够为不同的项目提供独立的Python版本和依赖库，避免了全局解释器带来的切换和维护问题。文章还介绍了作者个人常用的环境管理工具：pyenv用于Python版本管理，poetry和virtualenv用于依赖管理。此外，还简要说明了conda的使用注意事项，建议避免与pip混用，并了解import优先级。
category: 编程-后端-python
toAstro: true
---

# 管理python环境的方式

最近又有写 python 的需求了，上一次写还是几年前写圣纳百川爬虫的时候，因此很多事情记不太清楚了。

本文主要来疏离总结一下管理 python 环境的方式，以及它们的适用场景。

---

## 主流的方案

对于不同的项目，它们会用到不同的 python 版本，以及不同的依赖库和版本。如果只使用全局解释器，那么切换和维护起来会非常的麻烦且容易出错。面对这样的场景，虚拟环境是更优的选择。

在官方文档中提到：[venv --- 创建虚拟环境 — Python 3.12.0 文档](https://docs.python.org/zh-cn/3/library/venv.html)

> `venv`  模块支持创建轻量的“虚拟环境”，每个虚拟环境将拥有它们自己独立的安装在其  [`site`](https://docs.python.org/zh-cn/3/library/site.html#module-site "site: Module responsible for site-specific configuration.")  目录中的 Python 软件包集合。虚拟环境是在现有的 Python 安装版基础之上创建的，这被称为虚拟环境的“基础”Python，并且还可选择与基础环境中的软件包隔离开来，这样只有在虚拟环境中显式安装的软件包才是可用的。

那么虚拟环境的管理具体有哪些呢？

![IMG-20240904002804460](https://pictures.kazoottt.top/2024/10/20241017-c3e24ad6634626388f1bd3614efcbc2e.png)  
我们从 pycharm 提供的解释器选项中能看出一二，pycharm 这里提供的都是比较主流的虚拟环境管理了。

1. venv（官方内置的模块）
2. virtualenv
3. conda
4. pipenv
5. poetry

这里不想分别对这些管理工作都做详细的介绍，只记录我自己最常用的组合。

我的需求有两类，第一类管理 python 的版本，第二类管理依赖的版本。

## 对于 Python 版本管理

使用 pyenv  
[GitHub - pyenv/pyenv: Simple Python version management](https://github.com/pyenv/pyenv)  
用来安装和切换 python 的版本

## 对于依赖管理

如果是我自己的项目，那么我会使用 poetry（因为操作比较像 npm，我更加熟悉）

如果是别人的项目且项目中不是使用 poetry 来管理的，那么我会使用 virtualenv 来管理。

### Poetry

[Basic usage | Documentation | Poetry - Python dependency management and packaging made easy](https://python-poetry.org/docs/basic-usage/)

如果是一个新的项目

```bash
poetry new poetry-demo
```

如果是一个已经存在的项目

```bash
poetry init
```

然后使用`poetry add 包名`安装依赖  
也可以指定版本，[Dependency specification | Documentation | Poetry - Python dependency management and packaging made easy](https://python-poetry.org/docs/dependency-specification/)

如果要导出 requirements 方便别人安装可以运行  
`poetry export -o requirements.txt`

### Virtualenv

[virtualenv](https://virtualenv.pypa.io/en/latest/)

创建虚拟环境  
``virtualenv env_name

激活  
如果是 linux  
`source env_name/bin/activate`  
如果是 windows  
`.\env_name\Scripts\activate`

当然如果你用的 IDE，它会帮你创建和关联

然后后面就是正常的 pip install xxx 之类的操作了。

### Conda

[请问大神们，pip install 和 conda install 有什么区别吗？ - 知乎](https://www.zhihu.com/question/395145313/answer/2449421755)  
conda 用来作为虚拟环境管理的话，不建议 pip 和 conda 混用，需要了解一下 import 优先级。

如果都安装了某一个包，那么优先 import 的是 conda 安装的

如果之前用 pip 装的，运行`conda convert`转一下。

然后后面都用 conda 来安装，conda 找不到的包再用 pip 来装。
