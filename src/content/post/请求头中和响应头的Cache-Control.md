---
title: 请求头中和响应头的Cache-Control
date: 2023-10-16
author: KazooTTT
tags:
  - 前端
  - 缓存
  - Cache-Control
  - 浏览器
published: true
link: 'https://kazoottt.notion.site/Cache-Control-6f025346af26464dba60b1084b6b1466'
notionID: 6f025346-af26-464d-ba60-b1084b6b1466
slug: cache-control-in-the-request-header-and-in-the-response-header
description: >-
  本文主要探讨了HTTP请求头和响应头中的`Cache-Control`指令，以及其在控制浏览器和共享缓存中的应用。文章首先通过一个Next.js
  API的实例，引入了`Cache-Control`中的`s-maxage`和`stale-while-revalidate`两个参数，并解释了它们的含义和作用。随后，文章详细介绍了`Cache-Control`的定义、使用场景以及不同指令的具体功能，如`no-cache`和`must-revalidate`的区别，以及`stale-while-revalidate`如何与`max-age`配合使用来管理缓存。此外，文章还提到了私有缓存和共享缓存的区别，并强调了在不同场景下使用`Cache-Control`指令时需要注意的事项。
---

# 请求头中和响应头的 Cache-Control

![[IMG-20250104114646427.png]]

## 更新日志

2023-10-16 更新到 [[#响应指令]]

## 起因

在写 nextjs 的 api 的时候，在请求头中看到这样一个配置

```ts
export async function GET(request: Request) {
  // get current url
  const code = processXml()

  // Return the weather data.
  return new Response(
    JSON.stringify({
      res: code,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate",
      },
      status: 200,
      statusText: "OK",
    },
  )
}
```

在请求头的 `Cache-Control` 这里有两个参数，s-maxage=300, stale-while-revalidate。由于未接触过缓存，因此不理解其中的含义。

下面将逐字段去理解，并记录缓存相关的知识。

## 含义

首先是 header 中的 `Cache-Control`  
[Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)  
在 mdn 的文章中，我们可以看到其定义

> The **`Cache-Control`** HTTP header field holds *directives* (instructions)—in both requests and responses—that control [caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) in browsers and shared caches (e.g. Proxies, CDNs).  
> `Cache-Control` HTTP 标头字段在请求和响应中保存指令（指令），用于控制浏览器和共享缓存（例如代理、CDN）中的缓存。

本质是一组指令  
use：使用的地方是在请求或者相应中。

effect: 作用是控制缓存，效果作用域是浏览器和共享的缓存。

补充:|

> [私有缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching) 是绑定到特定客户端的缓存——通常是浏览器缓存

# 疑问 Http 的缓存分为私有和共有，按照 Mdn 文档的说法，浏览器缓存是私有的一种。那么在上述的 Cache-control 的文档中，写到用于控制浏览器和共享缓存，有什么区别呢？

我们可以从提取出两组词语:

- 请求 响应
- 浏览器缓存 共享缓存  
  两两组合有四种场景，用的时候要注意下。

## 语法

用逗号分隔单个指令，最好使用小写。具体有哪些指令可以填写请参考  
[Cache-Control Directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#directives)  
就不在文章中赘述了（否则变成了复制粘贴）

### 响应指令

如果是响应指令，那么一般是用来控制请求响应之后，这个数据多久还是 `remains fresh` 的  
然后在用的时候需要去区分一下是共享还是浏览器缓存。

需要注意的是：`no-cache` 不是指的不缓存（不缓存的话，用 `no-store`），而是 response 可以存储在缓存中，但每次缓存的时候都需要源服务验证一下。

这样达到的效果是？每次使用缓存的时候，都去检查一下是不是最新的内容。、

意思就是，有最新的重新请求拿最新的，没有最新的就拿缓存里的。

然后 `must-revalidate` 指的是 response 可以被缓存，**如果发现过期了**，在再次使用的时候就需要通过源文件验证了。（与之相关的还有一个，共享存储用的 `proxy-revalidate`)

> - `no-cache`: 告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，一定要到源服务器进行副本有效性校验。
> - `must-revalidate`：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，必须去源服务器进行有效性校验。
> 来源：[web 性能优化之：no-cache 与 must-revalidate 深入探究](https://www.cnblogs.com/chyingp/p/no-cache-vs-must-revalidate.html)

也就是说这两个指令的区别主要是验证的条件，`no-cache` 是无论是否过期，都要校验，`must-revalidate` 则是过期的时候校验。

[[如何校验是否过期]] 则是另外一个话题了，后面再开一篇来讨论。

`stale-while-revalidate` stale 代表过期，revalidate 代表重新验证。

用这个指令的话，意味着可以使用过期的缓存，然后在后台也会去校验新的 reseponse，

怎么知道过期？要和 `max-age`（秒数）搭配着使用。

一篇很简单易懂的博文  
[利用“在重新验证时过时”功能保持内容的新鲜度](https://web.dev/articles/stale-while-revalidate?hl=zh-cn)

```
Cache-Control: max-age=1, stale-while-revalidate=59
```

![[IMG-20250104114647138.svg]]
