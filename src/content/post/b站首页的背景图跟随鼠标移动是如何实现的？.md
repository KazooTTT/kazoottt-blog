---
slug: >-
  how-is-the-background-image-on-the-home-page-of-b-site-realized-to-follow-the-mouse-movement
published: true
description: >-
  B站首页的背景图跟随鼠标移动的效果，是通过JavaScript结合HTML5的canvas元素实现的。具体步骤包括创建canvas元素、监听鼠标移动事件以获取位置坐标、根据鼠标位置计算图像绘制参数、使用canvas的绘图API更新图像帧，并通过requestAnimationFrame实现动画循环。这种技术不仅限于canvas，也可以使用CSS3动画或Web
  Animation API来实现类似效果，具体方法需根据项目需求和技术框架来选择。
tags:
  - b 站首页背景图、javascript、canvas、鼠标事件
---

# b 站首页的背景图跟随鼠标移动是如何实现的？

其实 b 站首页的背景图会跟着季节或者某些特殊的节日变化，里面也会有一些小细节。

今天看的时候突然发现鼠标悬浮上去，然后左右移动的时候，这个背景图片会跟随鼠标移动。如下图所示：

![[IMG-20250104114645478.gif]]

那么这样的效果是如何实现的呢？我们就来探究一下。

打开 F12，把无关的元素给删掉，只留下这个 banner 相关的 div，显示的效果如下：

![[IMG-20250104114647084.png]]  
dom 树中结构如下：

![[IMG-20250104114650176.png]]

来自 claude:

这种画面随着鼠标移动的效果可以通过 JavaScript 来实现。常见的方式是使用 HTML5 canvas 元素结合鼠标事件监听来绘制和更新动画效果。

基本步骤如下:

1. 创建一个 canvas 元素并获取它的 2D 渲染上下文。
2. 使用 JavaScript 监听鼠标移动事件,获取鼠标位置坐标。
3. 在鼠标事件处理函数中,根据鼠标位置坐标计算出需要绘制图像的位置和角度等参数。
4. 使用 canvas 的绘图 API 在每一帧中清空上一帧,并根据计算出的参数重新绘制新的一帧图像。
5. 使用 requestAnimationFrame 或 setTimeout 等方式实现动画帧的循环更新。

除了基于 canvas 的方式外,也可以使用 CSS3 动画或 Web Animation API 等方式来实现类似的动画效果,但原理都是根据鼠标位置不断更新和重绘图像帧。具体实现方式需要结合使用的技术框架和项目需求来设计。
