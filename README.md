## 概述

> 通过json直接在canvas上绘制图像.基于[cax](https://github.com/dntzhang/cax),借鉴(抄袭)了[mp_canvas_drawer](https://github.com/kuckboy1994/mp_canvas_drawer).比canvas_drawer多了图片圆角支持,圆形,缩放,分组等功能.文本支持动态高度,竖排.同时支持小程序和浏览器.

## 预览
![预览图](http://blog-res.mayday5.me/img/2019-07-01%2017.45.19.gif)

- [demo-web](http://blog.mayday5.me/json2canvas/example/web/index.html)

- 小程序demo
```bash
git clone https://github.com/willnewii/json2canvas.git
微信开发者工具导入项目 example/weapp/
```

## 功能说明
- 支持缩放 如果设计稿是750,而画布只有375时.你不需要任何换算,只需要将scale设置为0.5
- 支持图片圆角
- 支持圆型,矩形,矩形圆角(背景色支持线性渐变)
- 文本支持竖排,长文本自动换行
- [支持动态文本](https://github.com/willnewii/json2canvas/blob/master/doc/动态文本.md)
- 支持分组(cax里很好用的一个功能)  [说明](https://github.com/dntzhang/cax/blob/master/README.CN.md)

## 小程序添加json2canvas组件
require：SDKVersion>=2.6.1
小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)
```bash
1.npm i json2canvas
2.微信开发者工具->工具->构建npm
3.在需要使用的界面引入Component
{
  "usingComponents": {
    "json2canvas":"/miniprogram_npm/json2canvas/index"
  }
}
```

## [元素属性说明](https://github.com/willnewii/json2canvas/blob/master/doc/元素.md)

## 借鉴和引用
- [竖排计算 张鑫旭大神的博客](http://www.zhangxinxu.com/wordpress/?p=7362)
- [coolzjy@v2ex 正则优化断行](https://regexr.com/4f12l)
- [mp_canvas_drawer](https://github.com/kuckboy1994/mp_canvas_drawer)