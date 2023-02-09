<!--
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2023-02-02 00:07:36
 * @LastEditTime: 2023-02-05 09:51:28
 * @LastEditors: 最爱白菜吖
 * @FilePath: \codedesktop\README.md
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2023 by 武汉跃码教育, All Rights Reserved.
-->

# 安装 electron 镜像加速

```shell
npm config set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/

```

# electron-builder 镜像加速

```shell
npm config set ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
```

# 如何运行

## 开发模式

```shell
npm run dev
```

## 编译

```shell
npm run electron:build
```

> PS: 编译后的内容会输出到 build-electron 目录下。打包时自动采用 bytenode 进行加密，并且采用 v8-compile-cache 优化加速
