---
title: >-
  Possible Causes and Solutions for Focusee Switching System Audio to Speaker
  Playback forcibly
date: 2024-05-25T00:00:00.000Z
author: KazooTTT
type: Post
status: Draft
tags:
  - focusee
  - obs
  - VirtualSoundCard
  - BlackHole2ch
finished: true
published: true
slug: >-
  possible-causes-and-solutions-for-focusee-switching-system-audio-to-speaker-playback-forcibly
description: >-
  如果你想使用Focusee录制系统音，首先需要安装Gemoo Speaker，安装后可以将输出设备更改为Gemoo
  Speaker，并用它录制系统音。但是，注意不要在安装Gemoo
  Speaker的过程中也安装BlackHole2ch，这可能会导致无法正确录制音频。解释安装BlackHole2ch的方法是删除与其相关的文件夹。
  如果你需要录制系统音时，可以使用OBS。首先，添加屏幕捕获源，然后选择是否要录制桌面音或应用音。
  如果你需要录制系统音时，可以使用OBS。首先，添加屏幕捕获源然后选择是否要录制桌面音或应用音。
NotionID-notionnext: 80f19b4c-d207-45a0-bbbb-39641a9dc330
link-notionnext: >-
  https://kazoottt.notion.site/Possible-Causes-and-Solutions-for-Focusee-Switching-System-Audio-to-Speaker-Playback-forcibly-80f19b4cd20745a0bbbb39641a9dc330
rinId: 39
category: english writing
---

# Possible Causes and Solutions for Focusee Switching System Audio to Speaker Playback Forcibly

On macOS, when I wanted to use Focusee to record system audio, I followed its guide to install Gemoo Speaker.

Although switching the output device to Gemoo Speaker allowed me to record the system audio, it played the sound directly through the speakers.

Later, I found out that it was because I had installed BlackHole2ch. After uninstalling this virtual sound card, Focusee was able to record the sound through the headphones properly using Gemoo Speaker.

Uninstallation method:

Navigate to the folder `/Library/Audio/Plug-Ins/HAL` and delete the corresponding BlackHole2ch folder.

![image.png](https://pictures.kazoottt.top/2024/05/20240525-26e60249b527dc5dc46c78eb123769bf.png)

---

By the way, the reason I installed BlackHole2ch was to record system audio during screen recording or live streaming. Today, I suddenly discovered that OBS now directly supports recording system audio.

Here's how to do it:

1. Click the add button below the sources and select macOS Screen Capture.
   ![SCR-20240525-qcob-2.png](https://pictures.kazoottt.top/2024/05/20240525-862b985a72997075bf72d8dd84efa46c.png)

2. Choose whether to capture desktop audio or application audio based on your needs.
   ![image.png](https://pictures.kazoottt.top/2024/05/20240525-b1ea5d3a03406f26588601ed66067a05.png)
