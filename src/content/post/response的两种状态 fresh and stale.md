---
title: response的两种状态 fresh and stale
date: 2024-02-07
author: KazooTTT
tags:
  - 缓存
published: true
slug: two-states-of-response-fresh-and-stale
description: >-
  在HTTP协议中，响应（response）的状态分为新鲜（fresh）和过时（stale）两种。判断一个响应是否过时的标准是生成响应后的时间是否超过了预设的阈值。HTTP
  1.0使用Expires来指定超时时间，这是一个绝对时间，但存在可以通过修改系统时间绕过限制的缺点。而HTTP 1.1则采用cache
  control中的max-age属性来判断，这是一个相对时间，更为灵活和安全。
---

# Response 的两种状态 Fresh and Stale

新鲜 过时

判断标准：生成 response 后的时间有没有超过某个值，其实 expires 和 max-age 本质做的事情一样，只是前者是绝对时间，后者是相对时间。

http1.0  
使用 Expires 来显式地表示超时的时间  
缺点：修改系统的时间可以绕过此限制

http1.1  
使用 cache control 的 max-age 来判断
