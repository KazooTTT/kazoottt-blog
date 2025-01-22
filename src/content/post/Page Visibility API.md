---
title: Page Visibility API
date: 2024-05-22
author: KazooTTT
type: Post
status: Published
tags:
  - document
  - mdn
  - html
  - pagevisibility
finished: true
published: true
slug: page-visibility-api
description: >-
  The Page Visibility API is a web API related to the Document object, designed
  to determine whether the current document is visible to users. It is
  particularly useful for pausing and resuming animations and videos when the
  user switches to a different tab, thereby conserving system resources and
  battery life. Additionally, it can enhance user interaction by dynamically
  changing the page title based on visibility status, such as changing the title
  to "你快回来" when the tab is not in focus. The API is supported by various
  resources and discussions, including those on GitHub and articles by experts
  like Ruan Yifeng, ensuring its compatibility and practical application in web
  development.
NotionID-notionnext: 3bd51bf2-356f-4059-9d12-e8321d422a49
link-notionnext: >-
  https://kazoottt.notion.site/Page-Visibility-API-3bd51bf2356f40599d12e8321d422a49
rinId: 45
---

# Page Visibility API

[Page Visibility API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

这是一个与 Domcument 有关的 API，主要用来判断当前的 document 是否可见。

具体的用途：

- **暂停/恢复动画和视频**：当用户切换到其他标签页时，暂停正在播放的视频或动画，节省系统资源和电量。当用户返回该页面时，再恢复播放。
- 为用户交互提供一些多样性，例如我们切换到其他的 tab 页的时候，博客对应的 tab 的标题变成了“你快回来”。

``` js
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "你快回来";
  } else {
    document.title = "原始标题";
  }
});
```

## 协议以及相关的讨论

[GitHub - w3c/page-visibility: Page Visibility](https://github.com/w3c/page-visibility)

[Editorial: remove note about hidden being 'historical' by marcoscaceres · Pull Request #64 · w3c/page-visibility · GitHub](https://github.com/w3c/page-visibility/pull/64)

## 其他的资料

[Page Lifecycle API 教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/11/page_lifecycle_api.html)

[Page Visibility API 教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html)

[使用 Page Visibility API  |  Articles  |  web.dev](https://web.dev/articles/pagevisibility-intro) 这篇文章很好地实现了兼容性
