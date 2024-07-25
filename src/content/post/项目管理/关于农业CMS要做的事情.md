---
title: 关于农业CMS要做的事情
date: 2024-02-11T00:00:00.000Z
author: KazooTTT
tags:
  - CMS
  - grain
finished: true
published: true
slug: things-to-do-about-agriculture-cms
description: >-
  这个项目是由我的同学吴泓志委托我开发的，主要包括前端和后端两部分。前端代码基于React、Ant
  Design和Vite，托管在GitHub上，地址为[https://github.com/KazooTTT/grain-database-webapp](https://github.com/KazooTTT/grain-database-webapp)。后端代码则基于Flask，同样在GitHub上，地址为[https://github.com/KazooTTT/grain_database_backend](https://github.com/KazooTTT/grain_database_backend)。项目涉及的农业CMS功能包括模板修改和多项列表页及详情页的开发任务，如级联选择、多选功能、数据下载支持以及属性统计和图表展示等。
rinId: 123
---

这个项目是我的同学吴泓志委托我做的

# The Source Code

[frontend source code](https://github.com/KazooTTT/grain-database-webapp)

based on react + antd + vite

[backend source code](https://github.com/KazooTTT/grain_database_backend)

based on flask

# 关于农业CMS要做的事情

## 2024-04-08 上传模板修改

## 2024-02-11

- [x] 列表页 把Material和Variety的级联选择给做好
- [x] 列表页 Property是多选
- [x] 列表页 Year是多选
- [x] 列表页 支持下载。参考格式如下: 每一个property都有对应的其他的column。（1）
- [x] 详情页 每个属性都需要画一张累计频率图
- [x] 详情页 每个属性都需要有统计
- [x] 详情页 需要支持下载（2）

（1）

    ![[Pasted image 20240211211126.png]]

    ![[Pasted image 20240211212504.png]]

（2）

![[Pasted image 20240211211006.png]]
