---
title: CSS | 链接样式需要遵循LVHA顺序的原因
date: 2021-07-23
author: KazooTTT
tags:
  - CSS
  - 学习笔记
  - 《深入解析CSS》
  - 前端
slug: reasons-why-link-styles-need-to-follow-the-lvha-order
published: true
description: >-
  在CSS中，链接的伪类选择器（:link, :visited, :hover,
  :active）遵循LVHA顺序的原因是为了确保样式正确应用。由于这些伪类的优先级相同，后定义的样式会覆盖先前的样式。因此，为了防止样式冲突，应按照LVHA顺序定义这些伪类，即先定义:link，然后是:visited，接着是:hover，最后是:active。这样的顺序确保了链接在不同状态下的样式能够正确显示，例如在鼠标悬停或点击时。
NotionID-notionnext: 'https://kazoottt.notion.site/d4aa37afdc8147d89869d67ebb5b4e7c'
category: 前端
toAstro: true
---

# 链接样式需要遵循 LVHA 顺序的原因

《深入解析 CSS》中有这样一句话

> 伪类选择器（如：hover）和属性选择器（如 [type="input"]）与一个类选择器的优先级相同。通用选择器（＊）和组合器（>、+、~）对优先级没有影响。

也就是说对于以下四个伪类，没有优先级之分。

如果某一个链接同时处于两个或者以上的状态，并且状态对应的样式产生了冲突，后出现的样式就会覆盖掉前面的样式。

```css
a:link {
  color: blue;
  text-decoration: none;
}

a:visited {
  color: purple;
}

a:hover {
  text-decoration: underline;
}

a:active {
  color: red;
}
```

**那么为什么需要遵循 LVHA（link visited\hover active）顺序呢**？分析如下：

:link 这两个伪类是固定的状态（:link 是最原始的状态，:visited 是被点击过后就产生，这两个状态产生之后是一直存在的）

:hover :active 不是固定的，需要鼠标去触发，并且触发完毕之后会消失。

所以:link 作为最原始的状态，它的样式应该放在最前面，:visited 紧随其后。

而对于:hover 以及:active，设想一下如果:active 在:hover 之前，鼠标放到链接上去的时候，直接显示:hover 的颜色。点击链接的时候，由于:hover 在:active 下面，会覆盖 active 的颜色,这并不符合我们的需求，所以:active 应该在:hover 之后。

综上，由于伪类的优先级一致，后出现的样式会覆盖前面的样式，所以链接的样式应该遵循 LVHA 顺序

(方便记忆：love hate—> link visited hover active)
