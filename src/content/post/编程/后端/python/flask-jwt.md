---
slug: flask-jwt
published: true
description: >-
  本文对比了几个Flask可用的JWT库，包括flask-jwt-extended、Flask-JWT和jwt，根据PyPI下载量和Star量，选择使用最广泛的flask-jwt-extended。文章介绍了在父页面通过iframe嵌入子页面时，如何在子页面中验证和使用JWT
  token，包括页面级别和接口级别的token验证。同时，提供了安装flask-jwt-extended的命令，并建议参考官方文档进行详细配置。
category: 编程-后端-python
title: flask-jwt
date: 2024-09-10
author: KazooTTT
type: Post
status: Published
tags:
  - flask-jwt
  - flaskjwt扩展
  - token验证
  - iframe嵌入
  - 接口鉴权
  - 装饰器
finished: false
---

# Flask-jwt

## Flask可用库的对比

flask-jwt-extended的使用量是最多的，为了后期更好地项目维护，还是选择第一个来使用。

## 使用flask-jwt-extended

场景：

父页面 + iframe嵌入子页面，嵌入的时候url带上token。

在子页面需要做的事情：

1. 页面级别：每个页面都需要验证token是否有效。
2. 接口级别：每个接口都需要验证token是否有效。

### 对于页面

父页面使用iframe嵌入子页面的时候，url带上token。因此在子页面加载的时候需要处理url以获取token,然后把它存储在localStorage中。在后续接口调用中都需要把token带上，以便于接口的鉴权。

### 对于接口

实现一个装饰器，用于校验token。

## 具体过程

[参考文档](https://flask-jwt-extended.readthedocs.io/en/stable/basic_usage.html)

1. 安装`flask-jwt-extended`

```shell
pip install flask-jwt-extended
```
