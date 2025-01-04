---
title: “git-credential-osxkeychain”想要访问你的钥匙串中的密钥“github.com” 解决方法
date: 2024-09-01
author: KazooTTT
type: Post
status: Published
tags:
  - Git
  - macOS
  - 解决方案
finished: true
published: true
category: 软件
slug: git-credential-osxkeychain-solve-method
description: 解决 macOS 弹出 'git-credential-osxkeychain' 访问 GitHub 密钥的问题
NotionID-notionnext: 462377ea-6b4a-472c-9f55-ca4965dfe5c4
link-notionnext: >-
  https://kazoottt.notion.site/git-credential-osxkeychain-github-com-462377ea6b4a472c9f55ca4965dfe5c4
toAstro: true
---

# macos 一直弹出 “git-credential-osxkeychain”想要访问你的钥匙串中的密钥“github.com” 解决方法

现在网络上关于这个问题的解决方案大部分都是打开钥匙串访问，然后删除 github 的密钥，但是这个方法其实并不奏效。具体的解决方法如下（二选一即可）

## 方法一 使用 GitHub CLI

首先，使用 brew 安装 GitHub CLI：

```bash
brew install gh
```

然后，使用以下命令来登录：

```bash
gh auth login
```

## 方法二 使用 Git Credential Manager

如果没有 git，使用 brew 安装 git：

```bash
brew install git
```

然后，安装 git-credential-manager

```bash
brew install --cask git-credential-manager
```

最后，使用以下命令来登录：

```bash
git credential-osxkeychain
```

## 参考地址

[在 Git 中缓存 GitHub 凭据 - GitHub 文档](https://docs.github.com/zh/get-started/getting-started-with-git/caching-your-github-credentials-in-git)
