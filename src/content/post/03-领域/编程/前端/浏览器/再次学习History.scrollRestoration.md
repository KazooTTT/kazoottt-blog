---
title: 再次学习History.scrollRestoration
date: 2024-05-23
author: KazooTTT
type: Post
status: Published
tags:
  - History API
  - scrollRestoration
  - Web Development
  - JavaScript
  - 浏览器
finished: true
published: true
category: 浏览器
slug: understanding-history-scrollrestoration
description: >-
  本文重新探讨了浏览器History对象的scrollRestoration属性，该属性用于控制历史页面切换时滚动条是否恢复到之前的位置。scrollRestoration属性有两个可选值：auto和manual。当设置为auto时，滚动条会自动恢复到切换前的位置；若设置为manual，则滚动条保持在页面顶部。文章还讨论了该属性的局限性，包括可能导致的页面跳动和在不同浏览器中实现一致滚动恢复的困难。最后，文章建议在页面出现不美观跳跃或需要手动控制滚动条位置时，应将scrollRestoration设置为manual。
NotionID-notionnext: b5838d05-d223-4a6d-b92c-e284c5e5a2ce
link-notionnext: >-
  https://kazoottt.notion.site/History-scrollRestoration-b5838d05d2234a6db92ce284c5e5a2ce
rinId: 18
toAstro: true
---

# 再次学习 History.scrollRestoration

![2024-05-23-23-52-40](https://pictures.kazoottt.top/2024/05/20240523-96faf635fa38b9f54a7567a75d91e46c.jpeg)

之前在 react.dev 的源代码中了解到了这个 HIstory 的属性，当时写了一篇笔记来记录我对它的理解，现在看来还是一知半解。所以今天打算重新学习一下这个属性，主要从属性以及所属对象的介绍、使用方法，是否开启标准这几个方面来简单展开。

## 什么是 scrollRestoration

scrollRestoration 是一个属性，它所属的实例是浏览器的 History。

这个属性是做什么的？它用来控制我们在切换历史页面的时候，滚动条的位置会不会恢复到之前的位置。

![屏幕录制2024-05-23 10.48.05](https://pictures.kazoottt.top/2024/05/20240523-247544493f4d8292bbac76db53881606.gif)

如图所示，我们切换历史页面，又切换回最之前的页面，发现滚动条的位置依然保持底部，也就是之前的位置。

什么是切换历史页面，从操作上来讲就是点击浏览器的回退（有的浏览器长按回退键会弹出历史的前面多个页面供选择）、前进按钮

从代码上来讲就是执行下面的这些操作：

```js
history.back()
history.forward()
history.go(page) // page大于0，表示往后面翻对应的页数，反之则是往前翻对应的页数
```

那么 scrollRestoration 这个属性与是否恢复滚动条的关系是什么？

scrollRestoration 可选的值为 auto 和 manual (如果浏览器支持这个属性，那么它默认是 auto)

> scroll restoration mode, a scroll restoration mode, initially "auto". [HTML Standard](https://html.spec.whatwg.org/multipage/browsing-the-web.html#she-scroll-restoration-mode)

如果是 auto：那么在切换历史页面的时候，滚动条会自动地恢复到切换之前的位置。

如果是 manual：那么在切换页面的时候，滚动条会在顶部。

（上述的结果均在未手动修改 state 对应的滚动条位置的情况下）

## 属性的局限性

我之前觉得这个特性很好，但是为什么要单独地设置一个属性来控制是否要恢复到之前的滚动条位置呢？

在 [History API - 滚动恢复  |  Blog  |  Chrome for Developers](https://developer.chrome.com/blog/history-api-scroll-restoration) 这篇文章中提到：

> This often means unsightly jumps as the scroll position changes automatically, and especially so if your app does transitions, or changes the contents of the page in any way. Ultimately this leads to an horrible user experience.
> To make matters even worse there's very little you can do about it: Chrome triggers a `popState` event before the `scroll` event, which means you can read the current scroll position in `popState` and then reverse it in the `scroll` event handler with `window.scrollTo` (Ewww, but at least it works!). Firefox, however, triggers the `scroll` event *before* `popState`, so you have no idea what the old scroll value was in order to restore it. Bah!

翻译为中文：

> 这通常意味着当滚动位置自动改变时会出现难看的跳动，尤其是当你的应用程序进行过渡或以任何方式更改页面内容时。这最终会导致糟糕的用户体验。
> 更糟的是，你几乎无能为力：Chrome 会在 scroll 事件之前触发 popState 事件，这意味着你可以在 popState 中读取当前的滚动位置，然后在 scroll 事件处理程序中使用 window.scrollTo 恢复滚动位置（呃，但至少它能工作！）。然而，Firefox 则是在 popState 事件之前触发 scroll 事件，所以你无法知道旧的滚动位置以便恢复它。唉！

总结一下就是，此文的作者认为这个属性会造成的两个缺点是：

1. 可能产生不太美观的跳跃：当滚动位置自动改变时，页面内容可能会突然跳动，尤其是在应用程序进行过渡或更改页面内容时，这会导致不好的用户体验。
2. （在不开启这个属性的时候）非常难以人工地实现恢复滚动位置：由于不同浏览器在触发 popState 和 scroll 事件的顺序上存在差异（如 Chrome 和 Firefox），这使得在所有浏览器中一致地恢复滚动位置变得非常困难。

## 那么什么时候需要设置为 manual？

参考上面的两个缺点来说，当满足以下的条件的时候，可以考虑设置为 manual

1. 页面确实会产生了不太美观的跳跃
2. 不在意历史的滚动条位置，同时更希望全部由手动控制滚动条位置的时候

## 参考的资料

[History: scrollRestoration property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration)

[HTML Standard](https://html.spec.whatwg.org/multipage/nav-history-apis.html#dom-history-scroll-restoration)
