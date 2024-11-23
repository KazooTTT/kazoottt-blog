---
title: 【译】Alpine、Slim、Bookworm、Bullseye、Stretch、Jessie - 我应该选择哪个 Docker Image？
date: 2023-12-13
author: KazooTTT
tags:
  - dockek
  - 镜像
  - image
finished: true
published: true
slug: >-
  alpine-slim-stretch-bookworm-bullseye-buster-jessie-which-docker-image-should-i-choose
description: >-
  本文讨论了在选择Docker镜像时，如何根据不同的需求和环境选择合适的镜像，如Alpine、Slim、Bookworm、Bullseye、Stretch、Jessie等。文章详细解释了这些镜像的特点，包括它们的基础操作系统、大小、安全性和适用场景。同时，作者提供了一些实用的建议，帮助读者根据项目需求和环境限制，选择最合适的Docker镜像。此外，文章还强调了在生产环境中遵循安全最佳实践的重要性，并提供了比较不同Docker镜像大小的方法。
category: 阅读笔记
---

# **【译】Alpine、Slim、Bookworm、Bullseye、Stretch、Jessie - 我应该选择哪个 Docker Image？**

原文链接：[https://readmedium.com/zh/alpine-slim-stretch-bookworm-bullseye-buster-jessie-which-docker-image-should-i-choose-500f8c15c8cf](https://readmedium.com/zh/alpine-slim-stretch-bookworm-bullseye-buster-jessie-which-docker-image-should-i-choose-500f8c15c8cf)

使用的翻译GPT:**[翻译英文科技文章的 GPT](https://chat.openai.com/g/g-uBhKUJJTl-ke-ji-wen-zhang-fan-yi)**

翻译内容如下：

## Alpine、Slim、Bookworm、Bullseye、Stretch、Jessie—我应该选择哪个 Docker 镜像？

我关于选择适合你项目的正确 Docker 镜像的原始文章的更新。

![https://pictures.kazoottt.top/2023/12/20231213-image-1d1776c739303f0a861842105e514c5d.webp](https://pictures.kazoottt.top/2023/12/20231213-image-1d1776c739303f0a861842105e514c5d.webp)

照片由 Taylor Deas-Melesh 在 Unsplash 拍摄

几年前，当我在学习如何使用 Docker 来容器化我的应用程序时，[我写了一篇文章，讲解了不同版本和镜像类型之间的区别](https://readmedium.com/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d)。当我刚开始时，我总是困惑于应该选择哪个版本的镜像。

Alpine、slim、bookworm、bullseye、stretch、buster、jessie、slim-bookworm—这些都是什么意思？

它一直是并且仍然是我阅读量最高的文章。困惑是真实的。但是，自从我第一次写这篇文章以来，我学到了很多，想要提供一个更新。

简而言之，docker 镜像之间的区别仍然是其运行的底层操作系统。但问题仍然存在，你该如何选择正确的镜像？

记住，编程中没有永久的事物。你可以尝试不同的选项，看看哪个适合你，进行更改并重新部署。在推送到生产环境之前，始终彻底测试你的镜像。

## 简单标签 vs. 共享标签

在我之前的文章中，我没有解释你可能在一些 Docker 镜像页面上看到的简单标签与共享标签。

简单标签与特定版本的镜像相关联，该镜像是为 Linux 或 Windows 构建的。共享标签代表一组镜像。集合中的每个镜像可能为不同的平台和架构构建。

无论是简单标签还是共享标签，检索哪个镜像的决定都由主机 docker 守护程序确定。

要记住的是，“简单”标签用于单一平台（Windows 或 Linux），而“共享标签”可以用于多个平台的组合。

通常，如果你知道你为哪个平台构建，就选择简单标签。如果你真的需要一个可移植的 docker 镜像，你可能会考虑一个共享标签。小心这个并彻底测试。

## 完整官方镜像

我将使用 python 和 node 作为例子，因为这些是我最常用的 docker 镜像，但这些规则适用于大多数镜像。

根据 DockerHub 的说法，没有合格标签的完整镜像是事实上的镜像，如果你不确定并且刚开始，应该使用它。

例如：

python:3.11.4 node:20.3.0 这些镜像基于最新的稳定 Debian 操作系统版本。我通常在尝试在开发环境中快速启动一个项目时，首先使用其中之一，那时我还不关心生成的镜像的大小或安全性。

在我之前的文章中，我提到完整镜像是最安全的选择，但我想修改这个声明。完整镜像不是最安全的选择，但当你试图在开发环境中快速启动某事时，你应该使用它。

原因是，它可能包含你的应用程序或脚本运行所需的一切。

但是，在部署到生产之前，一定要选择对你来说最小最安全的镜像。在下面阅读有关 docker 安全最佳实践的更多信息。

所有其他镜像选择都是完整镜像的子集。因此，如果你从子集开始，你可能会发现自己必须安装在较小的镜像中不可用的工具。

如果你有更多时间，并且想要从一开始就为生产环境构建，那么研究下面概述的其他镜像选择，并找到适合你的镜像。

## -bookworm/-bullseye/-stretch/-jessie

带有 bullseye、bookworm、stretch、buster 或 jessie 标签的镜像是不同 Debian 版本的代号。在撰写本文时，稳定的 Debian 版本是 12，其代号是“Bookworm”。“Bullseye”是 Debian 11。“Buster”是 10。“Stretch”是所有版本 9 变体的代号，“Jessie”是所有版本 8 变体的代号。

未来的版本正在开发中，但尚未稳定，它们是“Forky”和“Trixy”。你可能会开始在 DockerHub 上的镜像版本列表中看到这些标签。

如果你的代码与特定版本的 Debian 操作系统兼容，请选择其中一个镜像。通常情况下，当你安装超出基础操作系统提供的包时，就会这样。在这种情况下，你要确保你留在同一个 Debian 版本上，这样你就不会在将来破坏你的构建。

## -slim

slim 镜像是完整镜像的精简版本。这个镜像通常只安装运行你特定工具所需的最小内容。就 Python 而言，那就是运行 python 所需的最少包，对于 node.js 也是如此。

通过省略不常用的工具，镜像变得更小。如果你有空间限制，不需要完整版本，请使用此镜像。

但是在使用此镜像时一定要彻底测试！如果你遇到无法解释的错误，请尝试切换到完整镜像，看看是否解决了问题。

Slim 还有一个额外的好处，那就是最安全的。更小的镜像有较少可能被攻击的点，所以如果你只需要运行一个基本脚本或你的应用程序不需要完整操作系统的许多功能，使用最小的镜像是最好的选择。

## -slim-bookworm/-slim-bullseye

将 slim 与特定 Debian 版本结合时，你会得到一个只包含运行该特定版本操作系统所需最基本文件的 slim 版本。

## -alpine

Alpine 镜像基于 Alpine Linux 项目，该项目是专门为容器内部使用而构建的操作系统。很长一段时间以来，这些是最受欢迎的镜像变体，因为它们的体积非常小。

然而，一些团队正在远离 alpine，因为这些镜像可能导致难以调试的兼容性问题。特别是，如果使用 Python 镜像，一些轮子被构建为与 Debian 兼容，并且需要重新编译才能与基于 Apline 的镜像一起使用。

使用 Alpine 镜像的主要原因是使你的结果镜像尽可能小。基础镜像将小于 5MB。当前的 python 基础镜像（将 python 添加到基础 alpine 镜像）为 78.9MB。那仍然相对较小。

如果空间是一个问题，这个镜像是最受推荐的。

缺点是它不包含你可能需要的一些包。主要是，它使用比 glibc 更轻的 musl lib。如果你的应用程序有特定的 libc 要求，你可能会遇到问题。

小型镜像中缺少你需要的东西，你可以直接在 Dockerfile 中安装所需的包。这样可以保持镜像仅包含你需要的内容。请注意，如果你安装了外部包，你的 Dockerfile 将会发生变化。主要区别在于你将使用 apk 而不是 apt-get 来安装包。

对于 -alpine 镜像有一些担忧，所以你需要了解它们。在这里和这里阅读一些关于它们的信息，并做好研究。同样，如果在构建 Dockerfile 时遇到无法解释的问题，尝试切换到完整镜像看看是否能解决问题。

## -windowsservercore

我很少使用 Windows，现在我坚定地站在 Mac/Linux 阵营，但如果你的应用程序只在 Windows 或 Windows Server 上运行，这是你的镜像。

## 在生产中，始终遵循安全最佳实践

一旦准备好进入生产，选择正确的基础镜像至关重要。当你超越了“让它工作”的阶段，你就需要确保你正在“正确地做事”。安全性是极其重要的一环。

首先，确保你使用的是 DockerHub 的官方镜像或由验证过的发布者构建的镜像。你可以在 DockerHub 上的镜像旁看到这些徽章。

选择满足你需求的最小基础镜像。决定以上哪个版本的镜像符合你的需求。较小的镜像可以最小化你暴露的安全漏洞数量，且更轻量。

确保你从 Dockerfile 中移除任何不必要的包。在开发和测试时，你可能会尝试安装一些包，但在部署到生产之前，返回去移除任何未使用的包。

不要在生产环境的 Dockerfile 中使用 :latest。这样做将总是拉取最新的镜像，而你的应用程序的依赖可能与未来版本不兼容，导致它可能在未来出现故障。

## 那么，我应该选择哪一个？

以下是我使用的一些一般指导原则：

- 如果我需要在开发环境中快速启动某物，没有空间限制，也没有时间瞎折腾，我会从事实上的镜像开始。
- 我主要关心的是镜像是否具备我需要的一切以开箱即用，我可以让我的概念验证工作。然而，这个镜像将占用最多的空间，也是最不安全的。除非绝对必要，不要在生产环境中使用它。
- 如果空间是一个问题，并且我知道我只需要运行特定语言（如 python）的最小包，我会选择 -slim。Slim 提供了运行 Python 所需的最低限度，并减少了安全漏洞。
  - 简单的 Python 脚本是 slim 镜像的良好候选。
- 对于一些我有时间彻底测试的项目，并且有极端的空间限制，我会使用 Alpine 镜像。但请注意，这可能导致更长的构建时间和难以发现的错误。
  - 如果你在将 docker 容器移植到新环境时遇到困难，或者在添加新包时出现故障，尝试不同的镜像。
- 当我需要安装针对特定 Debian 版本的额外包时，我使用 bullseye 或 bookworm 标签。这将确保我获得该版本 Debian 的最新版本，但不会在将来破坏我的构建。
  - 你还可以尝试这些镜像的 -slim 版本以减少空间。
- 最后，始终滚动到特定镜像的 DockerHub 页面底部，阅读有关选择特定镜像的建议。

## 比较 Docker 镜像大小

如果你想亲自检查 docker 镜像并比较它们的大小，请尝试这个。

```python
docker pull --quiet python:3.11.4
docker pull --quiet python:3.11.4-slim
docker pull --quiet python:3.11.4-alpine
docker pull --quiet python:3.11.4-bookworm
docker pull --quiet python:3.11.4-slim-bookworm
docker images | sort -k7 -h

```

你会看到事实上的镜像与 -slim 和 -alpine 版本之间有巨大的差异。

![https://pictures.kazoottt.top/2023/12/20231213-7157ae6bc4134733cc5b0dd17b46879a.webp](https://pictures.kazoottt.top/2023/12/20231213-7157ae6bc4134733cc5b0dd17b46879a.webp)

## 结论

在选择 docker 镜像时，重要的是要考虑许多因素，包括你为哪种架构构建、空间限制、安全问题以及构建镜像所需的时间。

我希望这有助于阐明差异，并指导你为下一个项目选择 docker 镜像。

🙏 感谢你读到最后！如果你有任何问题，请在下面评论或通过 [julie.perilla@gmail.com](https://www.notion.so/kazoottt/julie.perilla@gmail.com) 给我发邮件。

👉 新来 Medium？成为会员，每周只需 1 美元即可阅读任何文章！

☕ 喜欢你所读的内容？请我喝杯咖啡来激发更多内容！

## 参考文献

### Python

Python 是一种解释型、交互式、面向对象、开源的编程语言。[hub.docker.com](https://www.notion.so/kazoottt/hub.docker.com)

### Node

Node.js 是一个基于 JavaScript 的服务器端和网络应用平台。[hub.docker.com](https://www.notion.so/kazoottt/hub.docker.com)

安全最佳实践 镜像安全最佳实践指南 [docs.docker.com](https://www.notion.so/kazoottt/docs.docker.com)

### DebianReleases

Debian 正在持续开发中。最新发布的是 Debian 12.0。它也（当前）被称为或以其… [wiki.debian.org](https://www.notion.so/kazoottt/wiki.debian.org)
