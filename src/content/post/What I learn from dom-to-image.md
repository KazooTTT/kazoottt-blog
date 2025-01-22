---
slug: what-i-learn-from-dom-to-image
published: true
description: >-
  This article explores the dom-to-image library, detailing the author's
  experience with it, particularly in handling CORS issues when generating
  images from DOM nodes. The author shares their journey of diving into the
  source code to understand the library's functionality and to find alternative
  solutions to CORS problems. They also discuss the structure of the project's
  directory and highlight the importance of the README file and the main source
  file, `src/dom-to-image.js`.
tags:
  - dom-to-image
  - CORS解决方案
  - DOM转化
  - Image生成
  - 前端开发
---

# What I Learn from Dom-to-image

the github repo url is below:

[GitHub - tsayen/dom-to-image: Generates an image from a DOM node using HTML5 canvas](https://github.com/tsayen/dom-to-image)

## Why I want to Read the Source Code of This Project?

I use this lib to generate the image of mgclub post content. And When I use it, I found that it will throw out error because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).  
Finally, I convert the images to base64 in the server side to solve the problem.  
But I wonder how the lib realize the function and how can I solve the CORS in other way.  
So I start reading the source code of the project.

## RoadMap

## README

the `README.md` is a good choice to start.  
it tells me

1. what dom-to-image it is and what can it do
2. install
3. the way to use it (pass in Dom node and render options)
4. how it works (svg foreignObject)

## Directory Structure

```plain text
├── Gruntfile.js // dev and build config
├── LICENSE // open source litcence
├── README.md
├── bower.json // bower config
├── bower_components // for bower enable
├── dist // output
├── karma.conf.js // test
├── node_modules
├── package.json
├── spec // test
├── src // *the main file
└── test-lib
```

So we should read the `src/dom-to-image.js` mainly.

[[dom-to-image源代码解析]]
