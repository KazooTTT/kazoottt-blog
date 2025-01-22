---
title: form的validate注意判空
date: 2023-10-16
author: KazooTTT
tags:
  - antdesign
  - 组件库
  - react
  - antd
published: true
slug: ant-design-form-validate
description: >-
  在表单验证中，特别是密码确认字段的验证，需要注意即使设置了必填规则，也应在自定义验证函数中检查值是否为空。示例代码展示了如何使用Ant
  Design的Form组件进行密码确认验证，其中包含了一个必填规则和一个自定义验证函数，确保输入的密码与确认密码一致。如果不检查确认密码字段的值是否为空，可能会导致不必要的异常抛出。
---

# Form 的 validate 注意判空

![[IMG-20250104114646194.png]]

```js
<Form.Item
  name="confirm"
  label="Confirm Password"
  dependencies={["password"]}
  hasFeedback
  rules={[
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve()
        }
        return Promise.reject(new Error("The new password that you entered do not match!"))
      },
    }),
  ]}
>
  <Input.Password />
</Form.Item>
```

需要注意一下，即使 rule 中存在

```ts
   {
  required: true,
  message: 'Please confirm your password!',
   },
```

在后面的自定义校验（validator）中，也需要对 value 进行判断是否非空。

否则容易抛出其他的异常。
