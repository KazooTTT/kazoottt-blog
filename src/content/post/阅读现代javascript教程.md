---
title: 阅读现代javascript教程
date: 2024-02-24
author: KazooTTT
tags:
  - 笔记
  - javascript
  - 疑问
finished: false
published: true
description: >-
  本文深入探讨了JavaScript中对象的基础知识，包括如何检测对象是否存在某个属性，推荐使用in操作符而非判断undefined值。同时，文章解释了for...in和for...of循环的区别，指出for...in用于遍历对象属性，而for...of适用于遍历可迭代对象。此外，还讨论了对象属性的顺序、对象的引用和复制方法，以及JavaScript中的垃圾回收机制和this关键字的用法。特别提到了箭头函数没有自己的this这一特性。整体内容涵盖了JavaScript对象操作的多个重要方面。
slug: read-modern-javascript-tutorials
---

# 阅读现代 javascript 教程

[Object（对象）：基础知识](https://zh.javascript.info/object-basics)

检测某个 object 是否存在某个属性

不好的方法：判断 object 的某个属性值是否是 undefined（缺陷是：如果这个属性值本来就存储的是 undefined 的时候就属于判断错误了)

好的方法：使用 in 操作符

---

一直分不清楚的 for in, for of, for(;;)

```js
for (key in object) {
  // 对此对象属性中的每个键执行的代码
}
```

perplexity：

`for...in` 和 `for...of` 在 JavaScript 中的区别如下：

- `for...in` 用于遍历对象的属性，返回的是对象的键名（key）[1][2][3][4]。
- `for...of` 用于遍历**可迭代对象**（如数组、字符串、Map、Set 等），返回的是对象的键值（value）[1][2][4]。

因此，对于数组的遍历，推荐使用 `for...of`，而不是 `for...in`。

Citations:

[1] <https://segmentfault.com/q/1010000006658882>

[2] <https://juejin.cn/post/6844903601261772808>

[3] <https://segmentfault.com/a/1190000022348279>

[4] <https://blog.csdn.net/qq_45954420/article/details/124315795>

[5] <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of>

---

关于对象的 key 的顺序

> 对象有顺序吗？换句话说，如果我们遍历一个对象，我们获取属性的顺序是和属性添加时的顺序相同吗？简短的回答是：“有特别的顺序”：整数属性会被进行排序，其他属性则按照创建的顺序显示。[对象](https://zh.javascript.info/object)

---

对象的引用和复制

> 赋值了对象的变量存储的不是对象本身，而是该对象“在内存中的地址”——换句话说就是对该对象的“引用”。

复制，指的是引用的复制，而不是对对象本身的值的复制。

> 仅当两个对象为同一对象时，两者才相等。

如何复制？

1. 浅拷贝 Object.assign
2. 深拷贝 lodash 的 deepclone

---

垃圾回收

垃圾回收的基本算法被称为 “mark-and-sweep”。

定期执行以下“垃圾回收”步骤：

垃圾收集器找到所有的根，并“标记”（记住）它们。

然后它遍历并“标记”来自它们的所有引用。

然后它遍历标记的对象并标记 它们的 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。

……如此操作，直到所有可达的（从根部）引用都被访问到。

没有被标记的对象都会被删除。

---

javascript 的 this

什么叫箭头函数没有自己的 this #疑问

```js
function makeUser() {
  return {
    name: "John",
    ref: this,
  }
}

let user = makeUser()

alert(user.ref.name) // 结果是什么？
```

2024 年 02 月 24 日 看到了 [数据类型](https://zh.javascript.info/data-types)
