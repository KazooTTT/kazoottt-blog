---
title: search params 请求参数
date: 2024-11-13T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags: null
finished: true
published: true
category: 编程-前端
slug: search-params
description: null
NotionID-notionnext: 13d55568-fd75-81f5-be1b-e0a4f8137355
link-notionnext: 'https://kazoottt.notion.site/search-params-13d55568fd7581f5be1be0a4f8137355'
---

## react router `useSearchParams`

[useSearchParams  | React Router](https://reactrouter.com/en/main/hooks/use-search-params#usesearchparams)

``` ts
interface URLSearchParams {
    /** Appends a specified key/value pair as a new search parameter. */
    append(name: string, value: string): void;
    /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
    delete(name: string): void;
    /** Returns the first value associated to the given search parameter. */
    get(name: string): string | null;
    /** Returns all the values association with a given search parameter. */
    getAll(name: string): string[];
    /** Returns a Boolean indicating if such a search parameter exists. */
    has(name: string): boolean;
    /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
    set(name: string, value: string): void;
    sort(): void;
    /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

```

它提供了内建的 API，允许直接获取查询参数的值，比如 `.get()`, `.set()`, `.append()` 等。

``` ts
  const [queryParams, setQueryParams] = useSearchParams();
  console.log('%c Line:52 🍿 queryParams', 'color:#33a5ff', queryParams.get('medicalRecordID'));
```

## qs + window.location

[GitHub - ljharb/qs: A querystring parser with nesting support](https://github.com/ljharb/qs)

![image.png](https://pictures.kazoottt.top/2024/11/20241113-9c3c37d82dd684dc8ca2b75cfb16784e.png)

使用window.location.search获取到请求参数对应的字符串（需要注意的是：字符串是带有?的）

然后使用qs.parse方法来解析查询字符串

案例：localhost?medicalRecordID=1

错误使用:

``` ts
const getQueryParam = (): QueryParams => {
  // use qs to parse the query params
  const queryParams: QueryParams = qs.parse(window.location.search);
  return queryParams;
};
```

![](https://pictures.kazoottt.top/2024/11/20241113-157c9570908a6b1f584ae28db3eebf1d.png)

正确使用：

``` ts
const getQueryParam = (): QueryParams => {
  // use qs to parse the query params
  const queryParams: QueryParams = qs.parse(window.location.search.slice(1));
  return queryParams;
};
```

![image.png](https://pictures.kazoottt.top/2024/11/20241113-48ad512e7639c8027216269380b7cacf.png)
