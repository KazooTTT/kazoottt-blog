---
title: ant design pro i18n-remove报错
date: 2024-02-13
author: KazooTTT
tags:
  - antd
  - eslint
  - bugFix
finished: true
published: true
slug: ant-design-pro-i18n-remove
link: >-
  https://kazoottt.notion.site/ant-design-pro-i18n-remove-6e2a745902ca4600ae306437f0cd1a9f
notionID: 6e2a7459-02ca-4600-ae30-6437f0cd1a9f
description: >-
  在执行ant design
  pro的i18n-remove任务时，遇到了一个报错，错误信息显示环境键“es2022”未知。解决方法是注释掉.eslintrc.js文件中的extends部分。此问题在GitHub的ant-design/ant-design-pro仓库的Issue
  #10620中有详细讨论。
rinId: 66
---

# Ant Design pro i18n-remove 报错

报错日志：

```
* 正在执行任务: pnpm run i18n-remove

> ant-design-pro@6.0.0 i18n-remove /Users/kazoottt/GitHub/KazooTTT/toolkit

> pro i18n-remove --locale=zh-CN --write

✔ 📦 load all locale file and build ts

✔ ✂️ format routes

⠋ ✂️ remove locale for src/components/Footer/index.tsx./Users/kazoottt/GitHub/KazooTTT/toolkit/node_modules/.pnpm/@eslint+eslintrc@0.4.3/node_modules/@eslint/eslintrc/lib/shared/config-validator.js:175

throw new Error(message);

^

Error: .eslintrc.js » /Users/kazoottt/GitHub/KazooTTT/toolkit/node_modules/.pnpm/@umijs+lint@4.0.52_eslint@8.34.0_jest@29.4.3_styled-components@6.1.8_stylelint@14.8.2_typescript@4.9.5/node_modules/@umijs/lint/dist/config/eslint/index.js:

Environment key "es2022" is unknown


```

也就是

> Environment key "es2022" is unknown

这里报错了

解决方法：注释掉 extends 这里

```js
module.exports = {
  // extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
}
```

## 参考

[yarn run i18n-remove报错🐛 \[BUG\] · Issue #10620 · ant-design/ant-design-pro · GitHub](https://github.com/ant-design/ant-design-pro/issues/10620)
