---
slug: source-code-analysis-of-dom-to-image
published: true
description: >-
  本文详细解析了GitHub上的开源项目dom-to-image的源代码，该项目能够通过HTML5
  canvas从DOM节点生成图像。作者通过阅读和注释源代码，分享了其工作流程，包括递归克隆DOM节点、计算并复制样式、嵌入Web字体和图像、序列化节点为XML等步骤。此外，作者还讨论了使用该库开发截图应用的背景和动机，以及如何将帖子内容转换为图片以解决论坛分享问题。文章最后提供了toSvg函数的代码实现和分析，展示了如何将DOM节点转换为SVG数据URL。
tags:
  - >-
    Looks like you want me to write code based on the specifications you
    provided. However
  - >-
    I need a bit more information from you. The specifications mention various
    functions and their implementations in the `dom-to-image` library
  - >-
    but they don't provide enough context for me to write the entire code.
    Could you please provide more details or clarify which specific parts of the
    code you'd like me to implement? Additionally
  - >-
    are there any specific requirements or constraints I should be aware of
    while writing the code?
    Once I have a better understanding of what's required
  - I'll do my best to assist you in generating the code.
---

# Dom-to-image 源代码解析

仓库地址 [GitHub - tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas](https://github.com/tsayen/dom-to-image)

我写了注释的地址：[om-to-image](https://github.com/KazooTTT/dom-to-image/tree/code-reading)

分支是：code-reading 这个分支。

## 背景

开一个 thread 来记录阅读 dom-to-image 源代码的收获和感受。

是怎么发现这个库的？起因是想要快速制作封面于是找到了 [https://coverview.vercel.app](https://t.co/7Zzs7Av0kp) 这个网站，习惯性地 fork 了代码然后进行学习参考，发现这个网站的使用了 [dom-to-image](https://t.co/X434ulYzzh) 这个库。

为什么要阅读这个库的代码？因为我所使用的一个论坛没有提供分享内容为图片的功能，并且是小众应用，所以发送帖子链接到 qq 的时候，会被腾讯屏蔽无法直接打开，体验非常不好。所以我想开发一个分享帖子内容的功能。

而这个功能前期我有两种思路，第一种是使用 pptr 截图，第二种是把帖子内容渲染出来生成图片（联想到了之前 coverview 的思路，也就是使用 dom-to-image 了）。最后放弃 pptr 的原因是 vercel 的请求超过 10 秒则超时，而 pptr 的启动 +api 调用往往超过了这个时间，更别说服务之间的时间了。

不过市面上的截图 api 已经很成熟了，例如 [https://screenshotone.com](https://t.co/OC77w4GJRX) 可以直接调用，最近大热的 [https://screenshottocode.com](https://t.co/7LYVHIGjmR) 也是使用的上述 api 进行截图，而 cali 老师的博客使用的是 [https://urlbox.io](https://t.co/1kV1dVmLQ8) 这个 api。其他的就不一一列举了。

回到正题，于是我开始使用 dom-to-image 开始开发我的自己的截图应用。我能够直接根据帖子的链接，拿到对应的 post 的 content，content 由富文本编辑器编辑，因此保存的内容直接是 html，我只需要手动新增一下和社区类似的样式就可以渲染出差不多的帖子界面，然后调用 dom-to-image 截图。

## 开始

我们从 readme 入手,其实作者已经非常清晰地讲解了这个库的工作流程。

[GitHub - tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas](https://github.com/tsayen/dom-to-image?tab=readme-ov-file#how-it-works)

以下为内容引用以及翻译

1. Clone the original DOM node recursively  
   递归克隆原始 DOM 节点
2. Compute the style for the node and each sub-node and copy it to corresponding clone  
   计算节点和每个子节点的样式，并将其复制到相应的克隆

   - and don't forget to recreate pseudo-elements, as they are not cloned in any way, of course  
      并且不要忘记重新创建伪元素，因为它们当然不会以任何方式克隆

3. Embed web fonts  嵌入 Web 字体

   - find all the `@font-face` declarations that might represent web fonts  
      查找可能表示 Web 字体的所有  `@font-face`  声明
   - parse file URLs, download corresponding files  
      解析文件 URL，下载相应文件
   - base64-encode and inline content as `data:` URLs  
      base64 编码和内联内容作为  `data:` URL
   - concatenate all the processed CSS rules and put them into one `<style>` element, then attach it to the clone  
      将所有处理过的 CSS 规则连接起来并将它们放入一个  `<style>`  元素中，然后将其附加到克隆中

4. Embed images  嵌入图像

   - embed image URLs in `<img>` elements  
      在元素中  `<img>`  嵌入图像 URL
   - inline images used in `background` CSS property, in a fashion similar to fonts  
      CSS 属性中使用的  `background`  内联图像，其方式类似于字体

5. Serialize the cloned node to XML  
   将克隆的节点序列化为 XML
6. Wrap XML into the `<foreignObject>` tag, then into the SVG, then make it a data URL  
   将 XML 包装到标记中  `<foreignObject>` ，然后包装到 SVG 中，然后使其成为数据 URL
7. Optionally, to get PNG content or raw pixel data as a Uint8Array, create an Image element with the SVG as a source, and render it on an off-screen canvas, that you have also created, then read the content from the canvas  
（可选）若要将 PNG 内容或原始像素数据作为 Uint8Array 获取，请创建一个以 SVG 为源的 Image 元素，并将其呈现在你也创建的屏幕外画布上，然后从画布中读取内容
8. Done!  完成！

## 从 toSvg 开始

从 `dom-to-image.js` 的 18 行代码开始，从这里的代码中可以看出来，所有的图形转化的基础方法都是 toSvg 这一个。因此我们从 toSvg 入手，看看它的实现原理。

```js
var domtoimage = {
  // 2023-10-28 @kazoottt, standard lib functions
  toSvg: toSvg, // 2023-11-06 @kazoottt, 传入节点，返回svg dataUrl
  toPng: toPng, // 2023-11-06 @kazoottt, 传入节点，返回png dataUrl
  toJpeg: toJpeg, // 2023-11-06 @kazoottt, 传入节点，返回jpeg dataUrl
  toBlob: toBlob, // 2023-11-06 @kazoottt, 传入节点，返回blob对象
  toPixelData: toPixelData, // 2023-11-06 @kazoottt, 传入节点，返回表示RGBA的Uint8Array
}
```

toSvg 的代码如下

```js
function toSvg(node, options) {
  // 2023-10-28 @kazoottt, if the options received is undefined, set it to {}
  options = options || {}
  // 2023-10-28 @kazoottt, call the copyOptions method(just for impl for test, so it will not affect the behavior of dom-to-image itself)
  copyOptions(options)
  // 2023-10-28 @kazoottt, wrap the node to a Promise object so that it can be used in the chained calls
  return Promise.resolve(node)
    .then(function (node) {
      // 2023-10-29 @kazoottt, return Element
      return cloneNode(node, options.filter, true)
    })
    .then(embedFonts)
    .then(inlineImages)
    .then(applyOptions)
    .then(function (clone) {
      // 2023-11-06 @kazoottt, 节点转svg dataUrl
      return makeSvgDataUri(
        clone,
        options.width || util.width(node),
        options.height || util.height(node),
      )
    })

  /**
   * @description: 传入节点，之前保存的配置复制给这个节点，然后返回节点
   * @param {*} clone
   * @return {*}
   */
  function applyOptions(clone) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor

    if (options.width) clone.style.width = options.width + "px"
    if (options.height) clone.style.height = options.height + "px"

    if (options.style)
      Object.keys(options.style).forEach(function (property) {
        clone.style[property] = options.style[property]
      })

    return clone
  }
}
```

toSvg 的类型声明：  
入参：`node` 和 `options`  
出参：`Promise<any>`

由于这个库是很久之前写的，当时还不支持 es6 的写法，所以写的是一串回调。  
看起来可能会不习惯，转成 async 的写法后会比较好理解。  
不过这么多年这个库依然可以使用，也说明了兼容性很好。  
它进行的操作如下：

第一步: `Promise.resolve(node)` (可忽略)  
使用 `Promise.resolve(node)` 创建一个已经解决的 Promise，然后  `.then`  方法被用来添加一个回调函数。这样做的好处是，无论  `node`  是一个普通值还是一个 Promise，`.then`  方法都会正确地处理。不过其实 `cloneNode(node, options.filter, true);` 返回的也是 Promise，可以直接从这里开始调用的。  
作者在最开头写这里  `Promise.resolve(node)`  的使用可能是为了确保代码的健壮性。因为  `Promise.resolve(node)`  可以处理  `node`  是 Promise 或者非 Promise 的情况。如果  `node`  不是一个 Promise，

第二步：`cloneNode(node, filter, root)`

```js
    function cloneNode(node, filter, root) {
        // 2023-10-28 @kazoottt, if 1.the node is not the root 2.the filter is existed 3. after the filter, the node is not included, return undefined. (it is to  filter out the node)
        if (!root && filter && !filter(node)) return Promise.resolve();

        // 2023-10-29 @kazoottt,the result is: Element
        return Promise.resolve(node)
            .then(makeNodeCopy)
            .then(function (clone) {
                // 2023-10-29 @kazoottt, get the target node
                return cloneChildren(node, clone, filter);
            })
            .then(function (clone) {
                return processClone(node, clone);
            });
```

2.1 makeNodeCopy  
判断是否是 canvas，如果是 canvas 则直接转为

第三步 embedFonts

第四步 inlineImages

第五步 applyOptions

第五步 makeSvgDataUri
