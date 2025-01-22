---
slug: evoninja
published: true
description: >-
  本文主要介绍了evo.ninja仓库的代码结构和运行机制。首先，通过分析根目录下的package.json文件，了解到该仓库的脚本命令包括重置、清理、构建、启动服务等。特别关注了start:api命令，该命令实现在名为evo-ninja的工作区中，具体位于evo.ninja/app.cli目录下。这里的package.json文件定义了启动命令，分别指向cli.ts和api.ts文件，这两个文件依赖于app.ts文件。此外，还提到了evo.ninja的API部分使用了名为agent-protocol的库。
tags:
  - evo.ninja
  - agent-protocol
  - 语法错误
---

# evo.ninja

我首先阅读的是 evo.ninja 这个仓库的代码  
在它根目录的 package.json 中，它的 script 是这样写的：

```json
  "scripts": {
    "reset": "yarn clean && yarn && yarn build",
    "clean": "npx rimraf ./node_modules ./*/**/node_modules ./*/**/yarn.lock ./*/**/build",
    "build": "npx turbo build",
    "build:browser": "yarn workspace @evo-ninja/ui run build",
    "start": "yarn workspace evo-ninja run start",
    "start:browser": "yarn workspace @evo-ninja/ui run start",
    "start:api": "yarn workspace evo-ninja run start:api",
    "lint": "npx turbo lint",
    "lint:fix": "npx turbo lint -- --fix"
  },
```

然后在 run 中，它运行的是 start:api。所以我们直接来看 start:api 的代码。

可以看到 start:api 的代码是在工作区中 package.json 的 name 是 evo-ninja 的这个文件夹中的 package.json 中的 script 中的 start:api

具体位置就是 evo.ninja/app.cli 了

这个代码的 package.json 是这样写的：

``` json
"scripts": {
  "start": "ts-node src/cli.ts",
  "start:api": "ts-node src/api.ts",
  "build": "rimraf build && tsc --project tsconfig.build.json",
},
````

也就是说命令在 cli.ts，服务在 api.ts，而这两个文件都依赖于 app.ts，它才是主体。

[[evo.ninja api]]  
它用到了一个叫做 agent-protocol 的库来实现  
[[agent-protocol代码阅读]]
