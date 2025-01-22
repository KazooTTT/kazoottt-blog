---
title: agent-protocol
date: 2023-12-23
author: KazooTTT
tags:
  - JavaScript
  - TypeScript
  - Agent Protocol
  - agent
published: true
slug: agent-protocol-code-study
description: >-
  本文详细介绍了一个名为Agent Protocol的JavaScript & TypeScript
  SDK，该库旨在统一agent的规范，使不同agent之间的通信更为便捷。文章首先提供了库的文档和源代码地址，并解释了其主要功能和结构。接着，详细描述了库的入口点、目录结构以及如何使用tsup进行打包。此外，还深入探讨了库中包含的各种方法，如创建任务、列出任务ID、获取任务详情等，并解释了这些方法的内部逻辑和使用方式。最后，文章通过一个示例展示了如何使用Agent
  Protocol启动服务，并详细解释了启动过程中的每一步。
---

# Agent-protocol

下面我们先来看一下这个库的代码  
文档地址：

[JavaScript & TypeScript Agent Protocol SDK - Agent Protocol](https://agentprotocol.ai/sdks/js)  
源代码地址：

[js](https://github.com/AI-Engineer-Foundation/agent-protocol/tree/main/packages/sdk/js)

这个库的作用是什么？

统一 agent 的规范，让不同的 agent 之间通信更加容易。

## 入口和目录结构

这个库使用的是 tsup 来打包。

```js
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  target: "node16",
  platform: "node",
  format: "cjs",
  minify: true,
  sourcemap: true,
  dts: true,
  loader: {
    ".yml": "text",
  },
})
```

在自定义 Loader 的时候有这样一行代码：

```javascript
loader: {
    '.yml': 'text',
}
```

表示了 Tsup 的加载器配置。这个配置指定了当 Tsup 打包你的应用时，如何处理特定文件类型（在这种情况下是.yml 文件）。

具体来说，这个配置告诉 Tsup 在处理.yml 文件时使用 text loader。也就是说遇到 yml 文件的时候，直接把它作为纯文本文件加载到你的应用中，不进行特殊的编译或转换。

然后整个项目的结构如下：

![Pasted image 20231222231920](https://pictures.kazoottt.top/2023/12/20231223-cf324c088da5c1c9296b9167ee0a4780.webp)  
其中 model 和 yml.d.ts 是用来定义类型的。

然后这个库的入口为 index.ts（从 tsup 的配置中也能看出来）, 因此只导入了 agent 和 model 模块，因此可以看出 api 是只在 agent 里面用的。

所以层级是：

index.ts --> agent.ts --> api.ts

最后导出的内容为：

```typescript
export {
  type TaskInput,
  type Artifact,
  type StepInput,
  type StepOutput,
  type Step,
  type StepRequestBody,
  type Task,
  type TaskRequestBody,
  type StepHandler,
  type TaskHandler,
  StepResultWithDefaults as StepResult,
  createAgentTask,
  listAgentTaskIDs,
  getAgentTask,
  listAgentTaskSteps,
  executeAgentTaskStep,
  getAgentTaskStep,
}

export { v4 } from "uuid"

export default Agent
```

## 具体的方法

对于 Type 我们可以先不看，直接看后面的方法

### 对于 StepResultWithDefaults

这里是对于 StepResul 的一个初始化

### 对于 createAgentTask

这个方法的作用是：Creates a task for the agent. 为代理创建任务。

输入是任务的信息 输出是全局的任务列表  
内部的逻辑是：

跑一遍 taskHandler（从 Agent 外部传进来的）

然后获取到 stepHandler  
最后把任务的信息和 stepHandler 添加到全局的任务列表的最后

### 对于 listAgentTaskIDs

Lists all tasks that have been created for the agent.  
列出为代理创建的所有任务。

这里的逻辑很简单，就是去遍历全局的 tasks 把它的用 uuid 创建的 task_id 给取出来放到一个数组里

### 对于 getAgentTask

Get details about a specified agent task.  
获取指定代理任务的详细信息。

传入 task_id，获取 task item 的信息（也就是 task 和 stephandler 的信息）

### 对于 listAgentTaskSteps

Lists all steps for the specified task.  
列出指定任务的所有步骤。

根据 task_id 来查询这个 task 的所有的步骤 id

### 对于 executeAgentTaskStep

Execute a step in the specified agent task.  
执行指定代理任务中的一个步骤。

传入 taskId  
获取到对应的所有的任务  
执行 stephandler，获取到结果  
然后创建一个 step，把任务的 id ,step 执行结果给存进去  
最后把这个 step 给添加到一个全局的 step_list 的最后

### 对于 getAgentTaskStep

Get details about a specified task step.  
输入 task 和 step 的 id,查询这个 step 具体的信息

### 然后是最后的 Agent

它有一个静态的方法 taskHandler

和对外提供服务的接口化的方法 start()  
它把上述所有的方法都用 express 给构建成了服务

## 如何使用？

[minimal.ts](https://github.com/AI-Engineer-Foundation/agent-protocol/blob/main/packages/sdk/js/examples/minimal.ts)  
`Agent.handleTask(taskHandler).start()`

使用 Agent.handleTask(taskHandler).start() 来启动服务，过程中发生了什么

`Agent.handleTask(taskHandler).start()` 这一行代码的目的是通过调用 `Agent` 类的静态方法 `handleTask` 来创建一个 `Agent` 实例，然后立即调用该实例的 `start` 方法来启动服务。让我解释这个过程中发生的事情：

1. `Agent.handleTask(taskHandler)`：首先，`Agent.handleTask` 是一个静态方法，它接受两个参数，第一个参数是 `taskHandler`（任务处理程序），第二个参数是一个部分代理配置。这个方法的目的是创建一个新的 `Agent` 实例，并将 `taskHandler` 和代理配置传递给该实例的构造函数。实际上，这一步返回了一个 `Agent` 实例。
2. `.start()`: 一旦 `Agent.handleTask(taskHandler)` 返回一个 `Agent` 实例，紧接着调用了 `start()` 方法。这个方法用于启动代理服务。

   - 在内部调用 `createApi(config)`，是用于创建代理的 API。

总结起来，`Agent.handleTask(taskHandler).start()` 这一行代码的作用是：

1. 创建一个代理实例，该实例具有指定的任务处理程序和配置信息。
2. 启动代理服务，并根据提供的或默认的端口号监听客户端请求。
