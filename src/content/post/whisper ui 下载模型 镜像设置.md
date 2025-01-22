---
title: whisper ui 下载模型 镜像设置
date: 2025-01-05
author: KazooTTT
type: Post
status: Published
tags:
  - whisper-ui
  - huggingface
  - 镜像
  - 大模型
finished: true
published: true
category: 大模型
slug: whisper-ui-download-model-mirror-setting
description: 在使用 whisper ui 的时候，需要下载模型，如果不做配置默认是从 huggingface 下载的，但是 huggingface 在国内访问速度很慢，所以需要配置镜像。
toAstro: true
date_created: 2025-01-05T14:44:38+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

在使用 [whisper ui](https://github.com/jhj0517/Whisper-WebUI) 的时候，需要下载模型，如果不做配置默认是从 huggingface 下载的，但是 huggingface 在国内访问速度很慢，所以需要配置镜像。

配置方法如下：

第一步，在项目文件的 `backend\configs` 里新增.env 文件（如果你使用的是 pinokio，则是在 `app\backend\configs` 里新增.env 文件）

第二步，在.env 文件中添加镜像配置

```
HF_ENDPOINT=https://hf-mirror.com 
```

第三步，重新运行 whisper ui

## 参考

[如何快速下载huggingface大模型 – padeoe的小站](https://padeoe.com/huggingface-large-models-downloader/)