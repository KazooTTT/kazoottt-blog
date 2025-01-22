---
title: how to make a hollow cylinder in blender
date: 2025-01-15
author: KazooTTT
type: Post
status: Published
tags:
  - blender
  - cylinder
  - model
finished: true
published: true
category: blender
slug: how-to-make-a-hollow-cylinder-in-blender
description: 
toAstro: true
date_created: 2025-01-15T00:38:23+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

this is a blender note is to record how to make a hollow cylinder in blender.

we can split the problem into these parts:

1. create a cylinder
2. make the cylinder hollow

## 1. create a cylinder

method 1: in the object mode, press `shift + a` and select `mesh - cylinder`, we can create a cylinder in the scene.

![alt text](https://pictures.kazoottt.top/2025/01/20250115-cf0f5589dff49f5bd74887545528245b.png)

method 2: at the left top of the screen, click `add - mesh - cylinder`, we can create a cylinder in the scene, too.

![alt text](https://pictures.kazoottt.top/2025/01/20250115-3a42f7aaeffe74d9161f35d1fa18068f.png)

## (optional) 2. edit the cylinder when adding it

after we add a cylinder, we can see there has a `add cylinder` panel in the bottom left of the screen.

and if we click the `add cylinder` panel, we can edit the props of the cylinder, such as the vertex count, radius, depth, etc.

![alt text](https://pictures.kazoottt.top/2025/01/20250115-c15b02c04a8415e7f8188effa98f6bed.png)  

because i am a new user of blender,  so i will try to figure out the meaning of the props of panels one by one. (if you do not care about the meaning of the props, you can skip this part)

1. **Vertices**:
    - Defines the number of edges or vertices around the base of the cylinder. A higher number results in a smoother circle, while a lower number creates a more polygonal shape.（default 32）
2. **Radius**:
    - Sets the radius of the base of the cylinder. This controls how wide the cylinder is.（default 1m）
3. **Depth**:
    - Determines the **height** of the cylinder along the Z-axis.（default_2m）
4. **Cap Fill Type**:
    - Specifies the way the top and bottom caps of the cylinder are filled:
    - **None**: Leaves the ends of the cylinder open.（default）
    - **N-Gon**: Fills the ends with a single face (polygon) that spans the entire area.
    - **Triangles**: Fills the ends with triangles arranged in a radial pattern.
5. **Generate UVs**:
    - When checked, automatically generates UV mapping for the cylinder. This is useful for texturing the cylinder later.（default checked）
6. **Align**:
    - Determines the alignment of the cylinder relative to the scene:
    - **World**: Aligns the cylinder to the global coordinate system.
    - **View**: Aligns the cylinder to the current camera view.
    - **Cursor**: Aligns the cylinder based on the position and orientation of the 3D cursor.
7. **Location (X, Y, Z)**:
    - Specifies the position of the cylinder in 3D space. These fields allow you to place the cylinder at exact coordinates.（default 0,0,0） unit is meter
8. **Rotation (X, Y, Z)**:
    - Defines the orientation of the cylinder by specifying its rotation around each of the three axes.（default 0,0,0）unit is degree

## 3. make the cylinder hollow

press the tab key to enter the edit mode, then press `s` to select all the vertices, and press `delete` to delete the vertices.

press the number key `3` to enable the `face selection` mode, then press `s` to select all the faces, and press `delete` to delete the faces.

press the button shift and left click the fases at the top and bottom of the cylinder, like this:

![alt text](https://pictures.kazoottt.top/2025/01/20250115-94ed6520719664ee3dfebab331d0adda.png)

attention: you should click the faces at the top and bottom both, not the vertices, not the single face or other faces.

then we press the `i` button to inset the faces, move the mouse and we can see the faces are inseted, like this:

![alt text](https://pictures.kazoottt.top/2025/01/20250115-2eeef440bbc377405873689b4560b32b.png)  

then if then size is ok ,release the mouse

then press the `delete` button to delete the faces. (you should select the fases which you nested before)

![alt text](https://pictures.kazoottt.top/2025/01/20250115-6439ce14f7229427723f0694cfcae425.png)

now we can see the cylinder is hollow.

![alt text](https://pictures.kazoottt.top/2025/01/20250115-89fe97d1445513d78f54e6b99fbf45c3.png)
