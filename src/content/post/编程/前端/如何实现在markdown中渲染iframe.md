---
title: 如何实现在markdown中渲染iframe
date: 2024-04-01
author: KazooTTT
tags: []
finished: true
published: true
slug: how-to-render-iframes-in-markdown
description: >-
  本文介绍了如何在Markdown中渲染iframe的两种方法。第一种方法是通过直接在Markdown中嵌入iframe标签，需要使用`rehypeRaw`插件来实现HTML内容的嵌入。第二种方法是通过重写Markdown中的`a`标签，将其转换为iframe，这种方法可以根据链接内容进行定制化处理，例如将特定链接转换为iframe展示。文中还提供了相关的代码示例和项目源代码链接，以及一个演示地址供参考。
NotionID-notionnext: a63f5e28-352a-48cc-8c89-f9dd5b5a18ac
link-notionnext: 'https://kazoottt.notion.site/markdown-iframe-a63f5e28352a48cc8c89f9dd5b5a18ac'
rinId: 19
category: 编程-前端
toAstro: true
---

# 1 如何实现在 markdown 中渲染 iframe

demo 展示地址：[Create Next App](https://markdown-preview-eosin.vercel.app/demo)

项目源代码：[https://github.com/KazooTTT/markdown-iframe-preview/](https://github.com/KazooTTT/markdown-iframe-preview/)

[https://github.com/KazooTTT/markdown-iframe-preview/](https://github.com/KazooTTT/markdown-iframe-preview/)

使用的 markdown 渲染器是：[GitHub - remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown)

![https://pictures.kazoottt.top/2024/04/20240401-99bfb1d8434e94e5b66182ed42bc09b7.png](https://pictures.kazoottt.top/2024/04/20240401-99bfb1d8434e94e5b66182ed42bc09b7.png)

有两种方案，第一种是 iframe 以 html 的语法嵌入（1），第二种是重写 a 标签把它转化为 iframe（3）。

## 1.1 Iframe 直接嵌入 markdown

```markdown
### 1.1.1 Iframe

<iframe src="./" width="100%" height="500"></iframe>
```

参考：

[iFrame Not Rendering · Issue #661 · remarkjs/react-markdown · GitHub](https://github.com/remarkjs/react-markdown/issues/661)

[GitHub - remarkjs/react-markdown: Markdown component for React](https://github.com/remarkjs/react-markdown?tab=readme-ov-file#appendix-a-html-in-markdown)

也就是引入 rehypeRaw 这个 rehypePlugin，实现在 markdown 中嵌入 html。

（谨慎使用，需要保证 html 内容安全的情况下嵌入）

```tsx
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

const DempPage = () => {
  return <Markdown rehypePlugins={[rehypeRaw]}>{markdownContent}</Markdown>
}
```

## 1.2 a 标签转化为 iframe

在某些情况下我们需要把 a 标签的对应的网页直接展示出来，这个时候就要把 a 标签转化为 iframe 了。实现的方法是重写 a 这个组件。

下面是我的写法，我需要把链接中有 `/agent/special` 的所有的链接都以 iframe 的形式展示出来。于是做了一个特殊判断来实现这个逻辑。对于其他的不满足要求的 a 标签，则直接渲染为 a 标签即可。

这里还可以做一些拓展的写法，比如检查到网易云的音乐链接，就在前面加一个网易云的 logo，如果检测到外链那么点击的时候打开新的窗口等等。

```ts
import Markdown from "react-markdown";

const DemoPage = () => {
  <Markdown
    components={{
      a(props) {
        const { href, children } = props;
        if (href && href.indexOf("/agent/special") != -1) {
          return (
            <iframe src={href} width="100%" height="500" allowFullScreen />
          );
        }
        // 否则,渲染为普通的 <a> 链接
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
    }}
  >
    {markdownContent}
  </Markdown>;
};
```
