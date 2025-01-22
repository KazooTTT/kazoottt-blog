---
slug: how-to-implement-streaming-like-chatgpt
published: true
title: 如何实现像chatgpt一样的流式
date: 2024-02-18
author: KazooTTT
tags:
  - 流式
  - sse
  - 前端实践
finished: true
description: >-
  本内容介绍了如何使用微软封装的库来实现浏览器中的Event
  Source请求，该库支持POST方法及其他参数，仓库地址为GitHub上的Azure/fetch-event-source。文档中详细说明了使用方法，其中最常用的是`onmessage`方法，用于处理每次收到的消息。此外，目前Chrome
  Devtools中看不到Event Stream是正常现象，预计Chrome
  M123版本将在3月19日支持此功能。同时，ChatGPT也将从text/event-stream改为使用ws协议。
rinId: 79
---

# 如何实现像 chatgpt 一样的流式

如果是自己实现的话，使用浏览器的 api，只支持 get 方法，所以比较简单的方法就是直接用微软封装好的库，它是支持 post 以及传入其他参数的。仓库地址如下：

[GitHub - Azure/fetch-event-source: A better API for making Event Source requests, with all the features of fetch()](https://github.com/Azure/fetch-event-source)

具体的使用方法在他们的文档中也写的比较清楚了。

最常用的方法就是 `onmessage`，在这里面去写每次收到 message 的逻辑。

另外现在（截止 2024-02-18）的浏览器 Chrome Devtools 里面看不到 eventStream 是正常的。

["Event Stream" tab is empty in Chrome dev tools · Issue #3 · Azure/fetch-event-source · GitHub](https://github.com/Azure/fetch-event-source/issues/3)

预计 Chrome M123 将于 3.19 支持此功能。

![Pasted image 20240218181408](https://pictures.kazoottt.top/2024/07/20240720-Pasted%20image%2020240218181408.png)

另外 ChatGPT 也要从 text/event-stream 改为 ws 了。

[[待读]]
