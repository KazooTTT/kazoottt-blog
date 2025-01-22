---
slug: tcp-vs-udp-transport-layer
published: true
tags:
  - 三次握手
description: >-
  TCP和UDP是两种不同的传输层协议。TCP提供可靠的数据传输，确保数据的完整性和顺序不变，通过建立连接、发送SYN、接收SYN
  ACK和发送ACK等步骤来验证和确认链接。如果数据传输中出现问题，TCP会重新发送数据以恢复损失。TCP适用于文件传输和浏览器浏览等对稳定性要求高的场景。
  相比之下，UDP是一种不可靠的传输协议，它不建立会话，不保证数据传递，只是简单地发送数据。UDP不关心对方是否接收到数据，因此传输速度更快，适合实时性要求高的应用，如语音、视频通话和游戏。UDP的标头设计简单，有助于提高传输效率。
---

# Tcp 与 Udp 传输层

## Tcp 可靠

数据完整而且顺序不变  
先确认 验证链接

建立联系  
计算机发送 SYN  
接收方发送一条确认信息 SYN ACK  
计算机发送 ACK 收到给到服务器  
![[IMG-20250104114646207.png]]  
如果没有收到，就会重新发送（可以恢复损失的数据）

方式：

![[IMG-20250104114647089.png]]

seq is index of data item  
after trans , if the data is not the same as sended, the checksum will be not the same, it will be deleted

![[IMG-20250104114650568.png]]

文件传输，浏览器浏览，不介意延迟问题，重视稳定

## Udp 不可靠

无连接  
不建立会话，不保证数据传递  
只是一直发送数据

发数据的时候，不在乎对方是否接收到  
更快

重视实时连接  
语音，视频通话，游戏

UDP 标头  
![[IMG-20250104114651984.png]]
