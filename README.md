## 概述

> 通过json直接在canvas上绘制图像.基于[cax](https://github.com/dntzhang/cax),借鉴(抄袭)了[mp_canvas_drawer](https://github.com/kuckboy1994/mp_canvas_drawer).比canvas_drawer多了图片圆角支持,圆形,缩放,分组等功能. 同时支持小程序和浏览器.

## 预览
- [demo-web](http://blog.mayday5.me/json2canvas/example/web/index.html)

- 小程序demo
```bash
git clone https://github.com/willnewii/json2canvas.git
微信开发者工具导入项目 example/weapp/
```

## 安装
小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)
```bash
npm i json2canvas
微信开发者工具->工具->构建npm
```
在需要使用的界面引入Component
```
{
  "usingComponents": {
    "json2canvas":"/miniprogram_npm/json2canvas/index"
  }
}
```

## 功能说明
- 支持缩放 如果设计稿是750,而画布只有375时.你不需要任何换算,只需要设置scale为0.5
- 支持图片圆角
- 支持圆型
- 矩形支持渐变色
- 支持分组(cax里很好用的一个功能)  [说明](https://github.com/dntzhang/cax/blob/master/README.CN.md)

## 元素

#### 基础属性
属性 | 说明 | 类型 |
---|---|---|
x|元素左上角距离左侧距离,如果是group内,则是距离group左侧距离|number|
y|元素左上角距离顶部距离|number|
width|元素宽度|number|
height|元素高度|number|

#### circle(圆)
属性 | 说明 | 示例 
---|---|---|
r | 半径 | 20 | 
strokeStyle | 边框颜色 | #FFFFFF | 
lineWidth | 边框宽度 | 1 | 
fillStyle | 填充颜色 | #FFFFFF | 

#### rect (矩形)
属性 | 说明 | 示例 |备注
---|---|---|---
strokeStyle | 边框颜色 | #FFFFFF | 
lineWidth | 边框宽度 | 1 | 
fillStyle | 填充颜色 | #FFFFFF | 
linearGradient | 渐变点起始坐标 | [x1,y1,x2,y2] | 同createLinearGradient
colors | 填充颜色 | [[0,'#CCC'],[0.2,'#AAA'],[1,'#AAA']]| 同 addColorStop

#### image (图片)
属性 | 说明 | 类型 |
---|---|---|
url | 图片链接 |  | 
isCircular | 是否圆角 | boolean | 

#### text (文字)
属性 | 说明 | 类型 |
---|---|---|
maxWidth | 最大宽度(设置后会自动换行,需要和lineHeight配合使用) | int | 
lineHeight | 行高 | int | 
maxLine | 最大行数,超出则显示... | int | 
shadow | 阴影 | object：{color,offsetY,offsetYblur} | 

#### group（组）
[关于Group说明](https://github.com/dntzhang/cax/blob/master/README.CN.md#group)

### TODO
- 支持圆角矩形(RoundedRect)