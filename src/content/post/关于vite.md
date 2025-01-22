---
title: 关于vite
date: 2024-02-22
author: KazooTTT
tags:
  - vite
  - rollup
finished: false
published: true
slug: about-vite
description: >-
  本文介绍了如何在vite.config.js中配置alias，包括基本的alias配置和特殊情况下的处理，如对"~"符号的特殊处理。此外，还推荐了几种常用的vite插件，如vite-plugin-checker、vite-plugin-imp等，以及解决Uncaught
  ReferenceError: process is not defined错误的方法，建议使用import.meta.env替代。
---

# 关于 vite

如何配置 alias

```
// vite.config.js
module.exports = {
  alias: {
   { find: '@', replacement: '/src' },
  }
}
```

---

对于特殊 alias 的处理

某些组件中可能有 import "~@scope/pkgname/filename"

一般是出现在 css 引用的时候

这个时候需要对~做特殊处理

比较推荐的 vite 插件

```
// vite.config.js
module.exports = {
  alias: {
   { find: /^~@/, replacement: '@' },
  }
}
```

---

比较常用的 vite 插件

1. vite-plugin-checker。支持 eslint、ts、stylelint 等规则对应的警告或错误，并且支持直接点击跳转到对应的文件。
2. vite-plugin-imp，按需引入配置。（如果配置直接写 babelrc 可以满足要求则不需要，如果配置比较灵活，则可以使用这个插件来完成）
3. rollup-plugin-visualizer。打包文件可视化
4. @vitejs/plugin-legacy。提升 web 的兼容性。

---

报错：Uncaught ReferenceError: process is not defined

使用 import.meta.env 来替代
