---
slug: stl-is-used-in-vite
description: >-
  修改了vite配置文件和全局类型定义后，支持STL文件的导入现在可以正常使用。 
tags:
  - vite
  - stl
title: vite中使用stl
date: 2024-12-17T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
finished: true
published: true
category: null
toAstro: false
---

 首先需要修改 vite.config.ts

``` ts
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.stl'], // 允许 .stl 文件作为资源导入
});
```

 在 global.d.ts 新增对于.stl 的支持

``` ts
declare module '*.stl' {
  const content: string;
  export default content;
}
```

然后就可以 import 了
