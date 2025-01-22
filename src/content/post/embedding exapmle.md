---
title: embedding exapmle
date: 2024-02-28
author: KazooTTT
tags:
  - openai
  - embedding
finished: false
published: true
slug: embedding-exapmle
description: 一个很好的embedding例子
---

# Embedding Example

[emoji-semantic-search/server/app.py at main · lilianweng/emoji-semantic-search · GitHub](https://github.com/lilianweng/emoji-semantic-search/blob/main/server/app.py#L51)

## Build

构造一个 msg2emoji 的 json

```python
msg2emoji = {
    "Hello! How are you?": ["😊", "👋"],
    "I'm doing great!": ["👍"],
    "What about you?": ["❓"],
    "Me too!": ["😄"]
}
```

转化为数组

```python
descriptions = [
    "The emoji 😊 is about feeling happy.",
    "The emoji 👋 is about saying hello.",
    "The emoji 👍 is about showing approval.",
    "The emoji ❓ is about asking a question.",
    "The emoji 😄 is about expressing joy."
]
```

调用接口 embeddings

```python
[
    {"emoji": "😊", "message": "feeling happy", "embed": [0.1, 0.2, 0.3]},
    {"emoji": "👋", "message": "saying hello", "embed": [0.4, 0.5, 0.6]},
    {"emoji": "👍", "message": "showing approval", "embed": [0.7, 0.8, 0.9]},
    {"emoji": "❓", "message": "asking a question", "embed": [0.2, 0.3, 0.4]},
    {"emoji": "😄", "message": "expressing joy", "embed": [0.5, 0.6, 0.7]}
]
```

然后保存 emoji-embeddings.jsonl.gz 中，不用重复训练

## Search

从本地读取 emoji-embeddings.jsonl.gz 文件，然后格式化

请求 embedding api, 获取向量

```python
dotprod = np.matmul(self.embeddings, np.array(query_embed).T)
```

取 20 个最相似的返回
