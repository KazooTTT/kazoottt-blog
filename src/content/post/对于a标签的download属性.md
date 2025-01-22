---
title: 对于a标签的download属性
date: 2024-10-15
author: KazooTTT
type: Post
status: Published
tags:
  - 前端
  - html
finished: true
published: true
category: 前端
slug: the-download-attribute-for-the-a-tag
description: download属性是如何定义的以及注意事项。 不能设置为null，可以直接设置成空串或者null。
toAstro: true
date_created: 2025-01-04T11:44:53+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

## 对于 a 标签的 download 属性

![image.png](https://pictures.kazoottt.top/2024/10/20241012-b044604cec83cd5e0b281b9e63562f11.png)

[\<a\>: The Anchor element - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)

---

如何定义没有值？

`<a download>` 或者 `<a download="">`

---

在设置的需要注意类型转换：

``` js
let temp1 = document.createElement('a');

temp1.download = null;

console.log(temp1.download); // 输出 undefined

```

但是如果先设置了 download = '', 再设置 download = null, 就会被转化为 'null'

![image.png](https://pictures.kazoottt.top/2024/10/20241012-1e0e4270de68707c51966174e2f2a063.png)

所以要么直接设置 download = null，要么直接设置 download = ''

不要设置了 download = '' 之后去设置 download = null
