---
title: 如何清空dns缓存
date: 2024-02-26
author: KazooTTT
tags:
  - dns
  - 缓存
  - mac
  - ip
finished: true
published: true
slug: how-to-clear-the-dns-cache
description: 本文介绍了如何在Mac和windows系统中清空DNS缓存和查看自己的IP地址。
rinId: 76
toAstro: false
---

# 如何清空 dns 缓存

## macos

如何清空 dns 缓存

``` shell
sudo dscacheutil -flushcache
```

mac 如何获取自己的 ip

``` shell
ifconfig
```

## windows

``` shell
ipconfig /flushdns
```
