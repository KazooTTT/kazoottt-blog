---
title: 快速获取telegram chatId然后实现消息通知的方法
date: 2023-09-14
author: KazooTTT
tags:
  - telegram
  - bot
  - 工具
finished: true
published: true
slug: quick-way-to-get-telegram-chatid-and-then-implement-message-notification
description: >-
  本文介绍了如何快速获取Telegram的chatId并实现消息通知的方法。首先，设置Telegram账户的username，然后向@RawDataBot发送消息以获取chatId。最后，结合Telegram
  bot和apprise工具来实现消息通知功能。
rinId: 20
category: 软件
toAstro: true
---

# 快速获取 telegram chatId 然后实现消息通知的方法

1. 给 telegram 账户设置 username
2. 搜索 [@RawDataBot](https://www.alphr.com/find-chat-id-telegram/)，给它发送一条消息。它会返回账户相关的信息给你。格式如下：，chat.id 就是所需要的 chatId![Pasted image 20230914233217](https://pictures.kazoottt.top/2024/10/20241017-cd326efab542823c73ab2e2542e89dd7.png)
3. 然后就能结合 [telegram bot](https://api.telegram.org/)+ [apprise](https://github.com/caronc/apprise/wiki/Notify_telegram) 做消息通知了。![Pasted image 20230914233337](https://pictures.kazoottt.top/2024/10/20241017-74884e2c10edcede13696599c163ffe4.png)
