---
slug: troubleshooting-stuck-icloud-uploads
published: true
description: >-
  本文介绍了如何排查iCloud上传卡住的问题，包括使用`brctl log -w`命令查看日志，以及通过`killall bird`和`killall
  cloudd`命令结束相关进程来解决问题。
tags:
  - icloud上传卡住
  - 日志打印
  - brctl-command
---

# 排查 icloud 上传卡住

日志打印

```sh
brctl log -w
```

杀掉进程

```sh
killall bird
killall cloudd
```
