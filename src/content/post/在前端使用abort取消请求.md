---
title: 在前端使用abort取消请求
date: 2024-04-17
author: KazooTTT
type: Post
status: Draft
tags:
  - 前端
  - request
  - 网络
  - abortController
  - 实践
finished: true
published: true
slug: use-abort-on-the-frontend-to-cancel-the-request
description: >-
  本文介绍了在不同前端框架中如何取消HTTP请求的方法。在原生JavaScript中，使用AbortController接口来实现请求的取消。在React中，通过useState和useEffect钩子管理AbortController的状态，并在组件卸载时自动取消请求。在SolidJS中，利用createSignal和onCleanup来处理AbortController，确保在需要时可以中断请求。这些方法都通过创建AbortController实例，并在fetch请求中使用其signal属性来控制请求的取消。
NotionID-notionnext: 801e2fa1-dfa9-4b4f-b579-ef7f6658b9d3
link-notionnext: 'https://kazoottt.notion.site/abort-801e2fa1dfa94b4fb579ef7f6658b9d3'
rinId: 53
---

# 在前端使用 abort 取消请求

举个例子，在写 llm 的 chat 的时候，经常会出现需要取消请求的场景。

如何在**前端**取消请求，涉及到一个接口：[AbortController.AbortController() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/AbortController)

在原生的 js 的写法，参考 mdn 的写法。

```js
let controller
const url = "video.mp4"

const downloadBtn = document.querySelector(".download")
const abortBtn = document.querySelector(".abort")

downloadBtn.addEventListener("click", fetchVideo)

abortBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort()
    controller = null
    console.log("Download aborted")
  }
})

function fetchVideo() {
  controller = new AbortController()
  const signal = controller.signal
  fetch(url, { signal })
    .then((response) => {
      console.log("Download complete", response)
    })
    .catch((err) => {
      console.error(`Download error: ${err.message}`)
    })
}
```

在 react 的写法

```jsx
import React, { useState, useEffect } from "react"

const RequestComponent = () => {
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [controller, setController] = useState(null)

  useEffect(() => {
    // 组件被卸载的时候，取消请求
    return () => {
      if (controller) {
        controller.abort()
      }
    }
  }, [controller])

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    const abortController = new AbortController()
    setController(abortController)

    try {
      const response = await fetch("https://api.example.com/data", {
        signal: abortController.signal,
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setResponseData(data)
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request canceled by user")
      } else {
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const cancelRequest = () => {
    if (controller) {
      controller.abort()
    }
  }

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      <button onClick={cancelRequest} disabled={!loading}>
        Cancel Request
      </button>
      {error && <div>Error: {error.message}</div>}
      {responseData && <div>Data: {JSON.stringify(responseData)}</div>}
    </div>
  )
}

export default RequestComponent
```

在 solidjs 中的写法，可以参考 diu 老师的 [GitHub - anse-app/chatgpt-demo: Minimal web UI for ChatGPT.](https://github.com/anse-app/chatgpt-demo)

```js
import { Index, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { useThrottleFn } from 'solidjs-use'
import { generateSignature } from '@/utils/auth'
import IconClear from './icons/Clear'
import MessageItem from './MessageItem'
import SystemRoleSettings from './SystemRoleSettings'
import ErrorMessageItem from './ErrorMessageItem'
import type { ChatMessage, ErrorMessage } from '@/types'

export default () => {
  const [controller, setController] = createSignal<AbortController>(null)


  const requestWithLatestMessage = async() => {
    setLoading(true)
    setCurrentAssistantMessage('')
    setCurrentError(null)
    const storagePassword = localStorage.getItem('pass')
    try {
      const controller = new AbortController()
      setController(controller)
      const requestMessageList = messageList().slice(-maxHistoryMessages)
      if (currentSystemRoleSettings()) {
        requestMessageList.unshift({
          role: 'system',
          content: currentSystemRoleSettings(),
        })
      }
      const timestamp = Date.now()
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          messages: requestMessageList,
          time: timestamp,
          pass: storagePassword,
          sign: await generateSignature({
            t: timestamp,
            m: requestMessageList?.[requestMessageList.length - 1]?.content || '',
          }),
          temperature: temperature(),
        }),
        signal: controller.signal,
      })
      if (!response.ok) {
        const error = await response.json()
        console.error(error.error)
        setCurrentError(error.error)
        throw new Error('Request failed')
      }
      const data = response.body
      if (!data)
        throw new Error('No data')

      const reader = data.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const char = decoder.decode(value)
          if (char === '\n' && currentAssistantMessage().endsWith('\n'))
            continue

          if (char)
            setCurrentAssistantMessage(currentAssistantMessage() + char)

          isStick() && instantToBottom()
        }
        done = readerDone
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
      setController(null)
      return
    }
    archiveCurrentMessage()
    isStick() && instantToBottom()
  }

 const stopStreamFetch = () => {
  if (controller()) {
   controller().abort()
   ...
  }
 }


  return (
    ...
  )
}
```
