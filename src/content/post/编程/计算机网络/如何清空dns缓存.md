---
title: 如何清空dns缓存
date: 2024-02-26T00:00:00.000Z
author: KazooTTT
tags:
  - dns
  - 缓存
  - mac
  - ip
finished: true
published: true
slug: how-to-clear-the-dns-cache
description: >-
  本文介绍了如何在Mac和windows系统中清空DNS缓存和查看自己的IP地址。
rinId: 76
category: 编程
---

# 如何清空dns缓存

## macos

如何清空dns缓存

``` shell
sudo dscacheutil -flushcache
```

mac如何获取自己的ip

``` shell
ifconfig
```

## windows 

``` shell
ipconfig /flushdns
```
