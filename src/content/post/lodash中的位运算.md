---
title: lodash中的位运算
date: 2023-10-20
author: KazooTTT
tags:
  - lodash
  - 源码学习
published: true
slug: lodash-bit-cal
description: >-
  在lodash的深拷贝源码中，使用了位运算来控制拷贝行为。通过设置不同的标志位，如CLONE_DEEP_FLAG和CLONE_SYMBOLS_FLAG，分别控制深拷贝和是否克隆symbol属性。这些标志位通过按位或（|）运算组合成一个变量，然后通过按位与（&）运算在baseClone函数中解构，以确定具体的拷贝行为。这种设计使得代码更加高效且灵活，能够根据不同的标志位组合实现不同的拷贝需求。
noteId_x: 6
create_time: '2023/10/20 09:56:48'
update_time: '2023/10/20 10:28:41'
publish_time: '2023/10/20 10:28:22'
link: 'https://kazoottt.notion.site/lodash-43f6444559334df780b685ca74591cec'
notionID: 43f64445-5933-4df7-80b6-85ca74591cec
---

# Lodash 中的位运算

在阅读 lodash 的深拷贝源码的时候，发现有 FLAG 这样的变量。

```ts
// src/cloneDeep.ts
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
```

- `CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG` 代表的是做位运行算,按位或操作
- CLONE_DEEP_FLAG - 控制是否进行深拷贝
- CLONE_SYMBOLS_FLAG - 控制是否克隆 symbol 属性
- CLONE_DEEP_FLAG 的值是 1 二进制表示是 0001  
  CLONE_SYMBOLS_FLAG 的值是 4,二进制表示是 0100

按位或计算如下:  
0001  
0100  
0101  
所以 1 | 4 二进制是 0101。结果是 5,

然后在传入 baseClone 的时候，

```ts
// src/.internal/baseClone.ts
function baseClone(value, bitmask, customizer, key, object, stack) {
  let result
  const isDeep = bitmask & CLONE_DEEP_FLAG
  const isFlat = bitmask & CLONE_FLAT_FLAG
  const isFull = bitmask & CLONE_SYMBOLS_FLAG
  ...

}
```

通过与运算来判断是否需要做某项操作。

之前我们传入的 bitmask 是 0101  
然后 CLONE_DEEP_FLAG 是 0001  
与运算得到的是 0001 (1)，其他同理

也就是说可以通过或的操作把变量组合为一个变量  
然后再用与操作，把变量解构成不同的变量
