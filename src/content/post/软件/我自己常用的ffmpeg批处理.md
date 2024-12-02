---
title: 我自己常用的ffmpeg批处理
date: 2024-10-14
author: KazooTTT
type: Post
status: Published
tags:
  - 视频处理
  - ffmpeg
finished: false
published: true
category: 软件
slug: >-
  01-my-own-commonly-used-ffmpeg-batch-processingmy-own-commonly-used-ffmpeg-batching
description: 转换FLV格式的视频成HDDP，用于弹幕压制。使用FFmpeg来实现该功能，支持多个操作系统，如Windows和macOS。
toAstro: true
---

## 720x1080批量转1920x1080（两边黑屏）

手机直播的时候录播机录出来的分辨率是720x1080，使用ffmpeg转成横屏的1920x1080。这样xml转ass弹幕的时候，就不需要另外处理了，看起来很更舒服。

macos的写法：

```bash
input_folder="" # 要转化的录播的文件夹路径
output_folder="" # 要输出的文件夹路径

# Create the output folder if it does not exist
mkdir -p "$output_folder"

for f in "$input_folder"/*.flv; do
  ffmpeg -i "$f" -vf "scale=720:1080,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:a copy "$output_folder/$(basename "${f%.*}.mp4")"
done
```

windows的写法：

```powershell
$input_folder = "Z:\\rec\\48743-hanser\\20240731-又来画画了！"  # 要转化的录播的文件夹路径
$output_folder = "Z:\\rec\\48743-hanser\\20240731-又来画画了！"  # 要输出的文件夹路径

# Create the output folder if it does not exist
If (-Not (Test-Path $output_folder)) {
    New-Item -ItemType Directory -Path $output_folder | Out-Null
}

Get-ChildItem -Path $input_folder -Filter *.flv | ForEach-Object {
    $input_file = $_.FullName
    $output_file = Join-Path $output_folder ($_.BaseName + ".mp4")
    $ffmpeg_args = @("-i", $input_file, "-vf", "scale=720:1080,pad=1920:1080:(ow-iw)/2:(oh-ih)/2", "-c:a", "copy", $output_file)
    & ffmpeg $ffmpeg_args
}
```

效果

![image.png](https://pictures.kazoottt.top/2024/10/20241014-20241014224347.png)

## 弹幕压制

### windows版(使用cuda)

```bash
@echo off
set input_folder=YourInputFolderPath
set output_folder=YourOutputFolderPath

for %%a in ("%input_folder%\\*.flv") do (
    ffmpeg -hwaccel cuda -c:v h264_cuvid -i "%%a" -vf subtitles="%%~na.ass" -c:v h264_nvenc -b:v 6000k -c:a copy "%output_folder%\\%%~na_压制.mp4" -y
)
```

### macOS版

```bash
#!/bin/bash

input_folder="/path/to/input"  # Replace with your input folder path
output_folder="/path/to/output"  # Replace with your output folder path

mkdir -p "$output_folder"  # Create the output folder if it doesn't exist

for f in "$input_folder"/*.mp4; do
    subtitle_file="${f%.*}.ass"  # Assumes subtitle file name is same as video file name but with .ass extension
    output_file="$output_folder/$(basename "${f%.*}_压制.mp4")"  # Output file name with _ass suffix

    ffmpeg -i "$f" -vf "ass=$subtitle_file" "$output_file"
done
```
