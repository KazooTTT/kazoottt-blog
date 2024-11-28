---
title: 在vtk.js中stl和json的互相转化
date: 2024-11-22T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - stl
  - json
  - vtkjs
  - 3D模型
  - 数据转换
finished: true
published: true
category: 编程-vtk.js
slug: in-vtkjs-stl-and-json-are-converted-to-each-other
description: >-
  STL模型可以通过 JavaScript 的 `vtk.js` 库以 JSON 格式进行读写。将 STL 模型读入 JSON 格式的方法是使用
  `vtkPolyData.toJSON()` 方法，反之，则需要使用 `vtkSTLWriter.newInstance()` 和
  `writer.getOutputData()` 来生成 STL 模型的文件内容。
noteId_x: 15
create_time: '2024/11/22 13:35:36'
update_time: '2024/11/22 14:40:08'
publish_time: '2024/11/22 14:38:29'
---

## stl如何转为json

``` ts
import vtkSTLReader from '@kitware/vtk.js/IO/Geometry/STLReader';

const getStlModelFromPath = async (path: string) => {
  const response = await fetch(path);
  const stlArrayBuffer = await response.arrayBuffer();
  
  const stlReader = vtkSTLReader.newInstance();
  stlReader.parseAsArrayBuffer(stlArrayBuffer);
  
  const polyData = stlReader.getOutputData();
  return polyData;
};

const stlPath = '/path/to/your/model.stl';
const polyData = await getStlModelFromPath(stlPath);
const jsonData = polyData.toJSON();
```

## json如何转为stl

``` ts
import modelJSON from './model.json';

const convertPolyDataJSONToStl = (polyDataJSON: string, fileName: string = 'model.stl') => {
    const polyData = vtkPolyData.newInstance(polyDataJSON);
    const writer = vtkSTLWriter.newInstance();

    writer.setInputData(polyData);
    const fileContents = writer.getOutputData();

    // Create a blob and download link
    const blob = new Blob([fileContents], { type: 'application/octet-stream' });
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;

    // Trigger download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
};


convertPolyDataJSONToStl(modelJSON);

```
