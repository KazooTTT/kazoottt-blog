---
title: 不推荐macOS用户购买focusee的理由
date: 2024-06-20
author: KazooTTT
type: Post
status: Draft
tags:
  - macOS
  - Focusee
  - 录屏软件
  - 评价
  - 退款
finished: true
published: true
category: 编程与技术
slug: focusee-macos-review
description: 分析了Focusee在macOS上的缺陷，包括色差严重、导出速度慢以及声卡配置冲突等问题，并分享了作者的退款经历。
NotionID-notionnext: c6b6e2f5-9da1-43f9-b531-b07d974815ed
link-notionnext: https://kazoottt.notion.site/macos-focusee-c6b6e2f59da143f9b531b07d974815ed
rinId: 42
---

# 不推荐macos用户购买focusee的理由

## 当时我为什么购买focusee

1. **需要同时录制摄像头和屏幕**：录视频的时候经常需要同时展示自己和电脑屏幕的内容。
2. **需要使用 zoom 功能**：在录制过程中，偶尔需要放大特定区域，focusee可以很方便地添加这个特效。
3. **同时支持 macOS 和 Windows**，而且
   双设备购买有优惠。

基于以上三点原因，我购买了focusee

## 为什么不推荐

### 色差严重

这一点是最严重的问题。

在macos上录制出来的视频色差明显，与实际画面相差很大，大到我认为几乎不能使用，具体的对比如下:

![8c214f3f-65f7-49d6-8abd-7011886b3392-spark-clipboard](https://pictures.kazoottt.top/2024/06/20240620-f8632859027aa520b2acfe05f8010997.jpg)

发现这个问题之后，我开始与对方团队沟通：

5月27日第一次反馈，对方回复说macOS 12.3以下没有这个问题，12.3以上有问题，目前正在寻找解决方案。

![CleanShot 2024-06-20 at 14.48.02](https://pictures.kazoottt.top/2024/06/20240620-7c6bb9ad347fed77aba7ee6ec6316dd0.png)

然后一直到6月18日还没有回复，所以我又发了一次邮件询问进度。结果对方告知：

1. 这是高版本的macOS导致的问题。（但是其他的录屏软件都没有出现这么严重的色差问题）
2. 解决这个具体问题可能会导致软件中其他色域的牺牲。
3. 当前的软件配置在平衡各种颜色方面提供了最佳解决方案（也就是说这个问题不予解决）

![CleanShot 2024-06-20 at 14.55.42](https://pictures.kazoottt.top/2024/06/20240620-0edca0a2dee7d10c1877c25a3aa1fbd3.png)

### 导出速度非常慢

是能够很明显的感受到慢，我的配置是mac mini m2 pro，无论是给录制的视频加上effect还是原封不动直接导出速度都很慢。

### 声卡配置容易冲突且不支持单应用录音

Focusee 的声卡设置会与我系统中的其他虚拟声卡产生冲突，可能会导致声音输出的声音被强制切换为扬声器，无法切换回耳机。

问题排查和解决方法：[[focusee录制系统声音被强制切换为扬声器播放的可能原因和解决方法]]

[focusee录制系统声音被强制切换为扬声器播放的可能原因和解决方法](https://www.kazoottt.top/article/possible-causes-and-solutions-for-focusee-switching-system-audio-to-speaker-playback-forcibly-zh)

而且它不支持单应用声音录制，无论是同类产品的screen studio(需付费)，QuickRecorder（开源免费），还是obs都已支持单应用声音录制了。

## 退款经历

由于对方邮件告知色差问题暂时不予解决，而这恰好是我最在意的一个功能缺陷，所以我决定了退款。

我是在[荔枝数码](https://lizhi.shop/)的淘宝店购买的 Focusee。联系了客服询问能不能退款之后，他们处理速度很快，迅速同意并完成了退款流程。这一点让我挺意外的，以后还有类似的购买需求的话，还是会考虑荔枝数码。
