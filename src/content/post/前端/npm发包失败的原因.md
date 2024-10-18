---
title: npm发包失败的原因
date: 2024-02-18T00:00:00.000Z
author: KazooTTT
tags:
  - npm
finished: true
published: true
slug: reasons-why-npm-fails-to-send-packages
link: 'https://kazoottt.notion.site/npm-b256188902f74be09e4ee74f8247da84'
notionID: b2561889-02f7-4be0-9e4e-e74f8247da84
description: >-
  本文讨论了在npm发包过程中可能遇到的失败原因，包括账号权限不足、包名不规范、包名包含屏蔽词等。特别提到了“download”是一个屏蔽词，作者通过将其替换为“downloader”后成功发布。同时，文章也提到了npm的命令行工具在错误信息提供上的不足，使得问题定位变得困难。参考了GitHub上的相关讨论，以帮助理解这一问题。
rinId: 73
category: 前端
---

# Npm发包失败的原因

## 可能的原因：

1. 当前的账号没有发包权限。（比如没有某个包或者某个scope的权限）
2. 当前的包名不符合规范。（需要URL-safe characters）
3. 当前的包名是屏蔽词。（例如download [[前端/node/npm发包失败的原因#npm包名屏蔽词]])
4. 其他（后续遇到了再补充）

// 吐槽一下，npm的cli给的信息很多都是无效信息，有时候很难从中知道到底是哪里有问题

## Npm包名屏蔽词

1. download (我替换成downloader之后才成功发布）

## 参考

[\[BUG\] npm publish get 400 Bad Request without any useful information · Issue #6090 · npm/cli · GitHub](https://github.com/npm/cli/issues/6090)
