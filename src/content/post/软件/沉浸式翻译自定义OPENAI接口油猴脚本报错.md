---
title: 沉浸式翻译自定义OPENAI接口油猴脚本报错
date: 2024-05-21
author: KazooTTT
type: Post
status: Published
tags: []
finished: true
published: true
slug: >-
  immersion-translation-error-message-for-custom-openai-interface-tampermonkey-script
description: >-
  用户在使用oneapi部署服务并接入deepseek翻译模型时遇到错误，错误信息显示域名未被列入@connect列表。通过查询，了解到@connect是油猴脚本的一个标签，用于允许脚本跨域请求特定配置的域名。解决方法包括手动添加域名到@connect列表、使用通配符*简化配置、在油猴脚本设置中添加域名到用户域白名单，或使用浏览器插件直接配置匹配所有URL的模式。
NotionID-notionnext: 26f6fc5b-4286-45e2-8e83-e178f45c1ae0
link-notionnext: 'https://kazoottt.notion.site/OPENAI-26f6fc5b428645e28e83e178f45c1ae0'
rinId: 56
category: 软件
toAstro: true
---

# 沉浸式翻译自定义OPENAI接口油猴脚本报错

![2024-05-21-14-49-20](https://pictures.kazoottt.top/2024/05/20240521-fa1b5c533f1a6add598bd6932e90d4ac.jpeg)

我使用oneapi部署了我自己的服务，接入了deepseek作为翻译的模型。

但是在配置好之后开启翻译报错：

> [!error]
> This domain is not a part of the @connect list

截图如下：

![Pasted image 20240521143947](https://pictures.kazoottt.top/2024/05/20240521-4afdaf59e2ef214c9de620a80588f8a3.png)

![Pasted image 20240521144007](https://pictures.kazoottt.top/2024/05/20240521-0b725e59786d21cd9c0bbf7b005952ff.png)

查询了一下：

`@conncet` 是油猴脚本一个tag，作用是允许油猴脚本跨域请求对应的配置的域名

[tampermonkey文档](https://www.tampermonkey.net/documentation.php#meta:connect)

所以油猴脚本报错的解决方法是：

1. 手动地把对应的域名加上去
   ![Pasted image 20240521143957](https://pictures.kazoottt.top/2024/05/20240521-38f1a6ea2cef12713a626f1c484f163a.png)
2. 直接添加`// @connect *`，这样后续也不会需要新增其他的配置了。
3. 同理在油猴脚本的设置页面的用户域白名单新增对应的域名或者直接添加\* ![Pasted image 20240521145459](https://pictures.kazoottt.top/2024/05/20240521-ec4ad5c0568ad651c2e230670f3ab535.png)
4. 最后一种简单直接的解决方法是直接使用浏览器插件，我个人的猜测是他们配置了[Match patterns](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns)为<all_urls>
   ![Pasted image 20240521144021](https://pictures.kazoottt.top/2024/05/20240521-a680cd664710c0c8cf7e627fc49f4cf7.png)
