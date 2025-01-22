---
title: md路径正确但是图片不显示的原因
date: 2024-03-01
author: KazooTTT
tags:
  - bug
  - markdown
  - md
finished: true
published: true
slug: the-reason-why-the-markdown-path-is-correct-but-the-image-is-not-displayed
description: >-
  从flowus导出文章后，图片无法在预览中显示，原因是路径中包含空格。解决方法是使用%20替换路径中的空格。此外，如果使用vscode的prettier格式化工具且未对md文件设置忽略，保存时可能会破坏文件路径链接，导致预览问题。
link: 'https://kazoottt.notion.site/md-74bbc5ba9b24460d91c04e6bd3ec5422'
notionID: 74bbc5ba-9b24-460d-91c0-4e6bd3ec5422
rinId: 71
---

# Md 路径正确但是图片不显示的原因

从 flowus 导出文章后，发现虽然路径是正确的，但是在预览中无法显示图片。

![Pasted image 20240301200523](https://pictures.kazoottt.top/2024/03/20240306-7615f968528d6630e35c284945e9e13a.png)

后来发现是路径中带有空格的原因，解决方法是使用%20 替代路径中的空格

![Pasted image 20240301200632](https://pictures.kazoottt.top/2024/03/20240306-49b846a5bd9f43425af5d034bd67e2e5.png)

另外还有一个坑点是：

如果你的 vscode 的 formatter 是 prettier，并且对于 md 没有做忽略设置，那么在保存的时候可能也会破坏你的文件路径链接，导致无法正常预览
