---
slug: how-to-visualize-the-agnet-thinking-process
published: true
description: >-
  本文探讨了如何使agnet过程可视化的两种方法：第一种是通过前端不断请求日志数据来更新日志，适合短期快速实现；第二种是通过前后端建立websocket连接，更适合长期效果。文章还详细介绍了websocket的实现方式，参考了blivechat的配置和实现思路，并通过代码示例展示了如何初始化websocket客户端和启动服务。此外，还解释了动态导入模块的优点，即实现代码分割，提高应用加载速度和性能。
tags:
  - 可视化、websockt、websocket连接、日志数据更新
---

# 如何使 agnet 过程可视化

经过调研有两种方式  
第一种是：

前端不断地请求日志数据，来更新日志。

第二种是：

前后端建立 websocket 的连接

我的想法是，如果是短期内要快速时间，那么第一种也可以  
如果长期效果的话还是第二种。

对于 websocket 我们来参考一下 blivechat 的实现思路  
blivechat 配置完之后，打开对应的网页，就会开始获取到这个直播的数据。

我们从路由入手，能看到实现这个界面的组件是 views/Room  
wss://broadcastlv.chat.bilibili.com/sub

页面 mounted 的时候，调用了

```
this.init()
```

重点来看 initChatClientPromise 的部分，这里是初始化了 ws 的客户端  
身份码 roomKeyType = 2  
房间号 roomKeyType = 1  
这里为了简化，我们直接来看 1

简化后的代码是这样：

```js
async initChatClient() {
 let ChatClientDirectWeb = (await import('@/api/chat/ChatClientDirectWeb')).default
 this.chatClient = new ChatClientDirectWeb(this.roomKeyValue)
 this.chatClient.msgHandler = this
 this.chatClient.start()
},
```

这里是新建了一个 chatClient，然后把组件实例赋值给到了 msgHandler，然后启动了服务。

为什么要这样写？

```js
let ChatClientDirectWeb = (await import("@/api/chat/ChatClientDirectWeb")).default
```

这是一个动态导入（Dynamic Imports）的例子，它是 JavaScript 的一个特性，允许你在运行时（runtime）按需（on-demand）加载模块。这与在文件顶部使用 import 语句的静态导入（Static Imports）方式不同，静态导入会在代码加载时就加载所有模块。

动态导入的主要优点是可以实现代码分割（Code Splitting），即将代码分割成多个小块（chunks），并在需要时才加载某个块，而不是一开始就加载所有代码。这可以显著提高应用的加载速度和性能，特别是对于大型和复杂的应用。

我们使用了

```
 this.chatClient.start()
```

来启动 ws 连接，这个 start 方法是继承自 ChatClientOfficialBase 类的。

```js
start() {
 this.wsConnect()
}
```
