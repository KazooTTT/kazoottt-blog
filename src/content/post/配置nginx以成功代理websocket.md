---
title: 配置nginx以成功代理websocket
date: 2024-12-17
author: KazooTTT
tags:
  - nginx
  - websocket
finished: false
published: false
slug: configure-nginx-to-successfully-proxy-websockets
description: 在使用socket.io时，用户遇到了WebSocket消息顺序错位的问题，并且浏览器控制台显示WebSocket连接失败，错误代码为200。经过调查，发现问题源于Nginx配置不当。用户参考了GitHub上的相关问题讨论和Nginx官方文档，发现需要正确配置Nginx以支持WebSocket代理。特别需要注意的是，在Nginx配置中，应正确设置`proxy_pass`、`proxy_http_version`、`proxy_set_header Upgrade`和`proxy_set_header Connection`等参数，确保backend指向正确的IP地址或域名，且无需添加后缀。
rinId: 81
type: Post
status: Published
category: 
toAstro: true
date_created: 2025-01-04T11:44:53+08:00
date_modified: 2025-01-22T13:40:14+08:00
---

# 配置 nginx 以成功代理 websocket

在使用 socket.io 的时候遇到这样一个问题：websocket 接收的消息的顺序错位了，然后看了一下浏览器的 console 的报错，提示连接到 ws 失败，然后在浏览器的开发者工具的网络中看了一下 ws 对应的消息里面报错：**Error during WebSocket handshake: Unexpected response code: 200**

查了一下发现是 nginx 没有配置的问题。

相关的类似的问题：

[https://github.com/websockets/ws/issues/979](https://github.com/websockets/ws/issues/979)

nginx 官方文档提到的解决方法：

[WebSocket proxying](https://nginx.org/en/docs/http/websocket.html)

需要注意的是：

```
location /chat/socket.io {
    proxy_pass <http://backend>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

这里的 backend 就是 ip 地址或者域名，不需要加后缀/chat/socket.io。
