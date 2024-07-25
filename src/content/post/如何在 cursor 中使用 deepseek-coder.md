---
title: 如何在 Cursor 中使用 DeepSeek-Coder
publishDate: 2024-07-25
author: KazooTTT
type: Post
status: Draft
tags:
  - deepseek-coder
  - OpenAI
  - API
finished: true
published: true
category: AI
slug: using-deepseek-coder-in-cursor
description: 本文介绍了如何在 Cursor 中添加和使用 DeepSeek-Coder 模型，以及配置相关的 OpenAI API Key 和 Base URL。
---

[Cursor](https://www.cursor.com/) 是一款智能代码编辑器，可以帮助用户生成代码、修改 Bug、生成测试等，提高编程效率。
可以免费使用，但是具有一定的额度。

![Pasted image 20240725133801](https://pictures.kazoottt.top/2024/07/20240725-Pasted%20image%2020240725133801.png)

但是它也可以使用自己的 key和模型具体的操作如下。
![Pasted image 20240725133037](https://pictures.kazoottt.top/2024/07/20240725-Pasted%20image%2020240725133037.png)

## 1. 添加模型：DeepSeek-Coder

在 Cursor 的模型页面，添加新模型，选择 `deepseek-coder`。

## 2. 配置 OpenAI API Key

在设置中找到 OpenAI API Key 选项，并填写 DeepSeek 提供的 API Key。

## 3. 配置 Base URL

在设置中找到 `Override OpenAI Base URL` 选项，并填入以下地址：

```
https://api.deepseek.com/v1
```

## 4. 在侧边栏中选择 deepseek-coder

![Pasted image 20240725134803](https://pictures.kazoottt.top/2024/07/20240725-Pasted%20image%2020240725134803.png)

这样配置就完成了
