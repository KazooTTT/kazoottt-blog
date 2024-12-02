---
title: npm scope公共包
date: 2024-02-18
author: KazooTTT
tags:
  - npm
finished: true
published: true
slug: npm-scope-public-package
description: >-
  在package.json文件中添加"publishConfig"字段，设置"access"为"public"，或者在发布时使用命令`npm publish
  --access=public`，以确保包的访问权限为公开。
rinId: 72
category: 编程-前端-node
toAstro: false
---

# Npm Scope公共包

在package.json中新增：

```json
  "publishConfig": {
    "access": "public"
  },
```

或者发布的时候加上 `--access=public`

```javascript
npm publish --access=public
```
