---
title: fetch 报错排查 SocketError other side closed
date: 2024-02-03
author: KazooTTT
tags:
  - 网络
published: true
slug: fetch-socketerror-other-side-closed
link: >-
  https://kazoottt.notion.site/fetch-SocketError-other-side-closed-d399e7db398c4f7faaa8d3e0003327fd
notionID: d399e7db-398c-4f7f-aaa8-d3e0003327fd
description: >-
  在main.js文件中使用fetch方法时遇到了报错，错误信息显示“fetch failed”并指出“other side
  closed”。错误发生在getFansNum函数中，具体是由于TLS连接的另一端关闭导致的。解决此问题的方法是关闭MitM（中间人攻击）工具，这通常用于拦截和修改网络通信，可能会导致不正常的连接关闭。
rinId: 15
finished: true
category: 前端
toAstro: false
---

# Fetch 报错

# 常规

排查 SocketError other side closed

在 main.js 中使用了 fetch，但是在运行 main.js 的时候时候 fetch 报错。

```shell
% node main.js

(node:51258) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
(Use `node --trace-warnings ...` to show where the warning was created)
node:internal/deps/undici/undici:11730
    Error.captureStackTrace(err, this);
          ^

TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11730:11)
    at async getFansNum (/Users/kazoottt/GitHub/bilibili-fans/main.js:11:20) {
  cause: SocketError: other side closed
      at TLSSocket.onSocketEnd (node:internal/deps/undici/undici:8280:26)
      at TLSSocket.emit (node:events:526:35)
      at endReadableNT (node:internal/streams/readable:1589:12)
      at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
    code: 'UND_ERR_SOCKET',
    socket: {
      localAddress: '198.19.0.1',
      localPort: 55306,
      remoteAddress: '198.18.2.185',
      remotePort: 443,
      remoteFamily: 'IPv4',
      timeout: undefined,
      bytesWritten: 607,
      bytesRead: 0
    }
  }
}

Node.js v20.10.0
```

从报错信息中可以看出来是 getFansNum 这个方法中的 fetch 方法报了错。

解决方法：

关闭 MitM
