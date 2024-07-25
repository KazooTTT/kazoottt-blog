---
title: focusee录制系统声音被强制切换为扬声器播放的可能原因和解决方法
date: 2024-05-25
author: KazooTTT
type: Post
status: Published
tags:
  - focusee
  - obs
  - 虚拟声卡
  - BlackHole2ch
finished: true
published: true
slug: possible-causes-and-solutions-for-focusee-switching-system-audio-to-speaker-playback-forcibly-zh
description: 
NotionID-notionnext: 8ac966eb-66b4-4f39-b2fa-3fd4e4911a41
link-notionnext: https://kazoottt.notion.site/focusee-8ac966eb66b44f39b2fa3fd4e4911a41
rinId: 41
---

# Focusee录制系统声音被强制切换为扬声器播放的可能原因和解决方法

在macOS上，我想要使用focusee录制系统声音的时候我按照它的引导安装了Gemoo Speaker

虽然输出设备切换到Gemoo Speaker输出，这样确实可以录制到系统的声音了，但是是直接用扬声器外放的声音。

后来我发现是我安装了BlackHole2ch的原因，卸载掉这个虚拟声卡之后，focusee就通过Gemoo Speaker可以正常地录制到耳机里的声音了。

卸载方法：

`/Library/Audio/Plug-Ins/HAL`

在这个文件夹中删除BlackHole2ch 对应的文件夹即可

![image.png](https://pictures.kazoottt.top/2024/05/20240525-26e60249b527dc5dc46c78eb123769bf.png)

---

顺带一提，当时安装BlackHole2ch的原因是想要在录屏或者直播的时候录制到系统的声音，今天我突然发现obs已经支持了直接录制系统声音的功能。

具体的操作是：

1. 点击来源下方的添加按钮，选择macOS音频采集
![SCR-20240525-qcob-2.png](https://pictures.kazoottt.top/2024/05/20240525-862b985a72997075bf72d8dd84efa46c.png)

2. 根据你的需求选择是采集桌面音频还是应用音频。
![image.png](https://pictures.kazoottt.top/2024/05/20240525-b1ea5d3a03406f26588601ed66067a05.png)
