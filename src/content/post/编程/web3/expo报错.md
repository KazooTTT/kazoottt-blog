---
title: expo报错
slug: expo-error
published: true
description: >-
  在expo开发中遇到报错：TypeError: The 'compilation' argument must be an instance of
  Compilation。错误的原因是项目中存在多个webpack版本，特别是由于额外添加了依赖"metro-core":
  "^0.80.1"。解决此问题的方法是删除node_modules目录，移除该依赖，然后重新安装依赖。
rinId: 10
finished: true
date: 2024-02-07
category: 编程-web3
---

# Expo 报错

[angular cli - The 'compilation' argument must be an instance of Compilation - Stack Overflow](https://stackoverflow.com/questions/67727180/the-compilation-argument-must-be-an-instance-of-compilation)

expo TypeError: The 'compilation' argument must be an instance of Compilation

```
npm ls webpack
```

原因是有多个 webpack，而具体的原因是我另外加了一个 dep  
"metro-core": "^0.80.1",

解决方法：删除 node_modules，以及把上面这个依赖移除，再安装一次。
