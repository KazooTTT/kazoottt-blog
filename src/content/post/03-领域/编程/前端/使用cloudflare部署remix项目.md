---
title: 使用cloudflare部署remix项目
date: 2024-12-19
author: KazooTTT
type: Post
status: Published
tags: 
finished: true
published: true
category: 前端
slug: deploy-remix-app-by-cloudflare
description: 
toAstro: true
---

如果使用 remix，然后用 cloudflare 进行部署。

通过 remix 的官方脚手架创建，在 Workers 和 Pages 中直接 import 仓库然后部署是无效的。部署完成后点击对应的域名访问，会无响应。

![image.png](https://pictures.kazoottt.top/2024/12/20241219-1d0058a3ba6bd4c0ac6ebda427dc0cdc.png)

正确的做法是：

参考 [cloudflare](<[Remix · Cloudflare Pages docs](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)>) 的文档，使用 cloudflare + remix 的模板创建

``` shell
pnpm create cloudflare@latest my-remix-app --framework=remix
```

然后再在 Workers 和 Pages 中 import 你对应的 git 仓库，然后构建设置选择 remix，它会帮你填好默认的配置，保留该配置即可。

![image.png](https://pictures.kazoottt.top/2024/12/20241219-d5b37df23d2adfaf0e24d0436d26405c.png)

## 参考

[Remix + Vite: assets not generated in /public - Developers / Cloudflare Pages - Cloudflare Community](https://community.cloudflare.com/t/remix-vite-assets-not-generated-in-public/633692)
