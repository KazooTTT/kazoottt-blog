---
title: 禁止antd modal按下esc关闭弹窗
date: 2024-10-15T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - antd
  - 前端
finished: true
published: true
category: 编程-前端
slug: antd-modal-esc-disabled
description: 解决antd modal 键盘关闭问题：设置modal的keyboard属性为false。
toAstro: true
---

参考地址：[Modal: option not to close with cancel key · Issue #22137 · ant-design/ant-design · GitHub](https://github.com/ant-design/ant-design/issues/22137)

解决方法：

设置modal的keyboard属性为false

在antd的modal的文档中也有提到：[对话框 Modal - Ant Design](https://ant-design.antgroup.com/components/modal-cn#api)

| 参数       | 说明            | 类型      | 默认值  | 版本  |
| -------- | ------------- | ------- | ---- | --- |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |     |
