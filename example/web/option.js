option = {
    "元素测试": {
        "width": 750,
        "height": 1334,
        "scale": 0.6,
        "fillStyle": "#40395A",
        "children": [
            {
                "type": "group",
                "x": 48,
                "y": 20,
                "children": [{
                    "type": "text",
                    "text": "1.图片",
                    "font": "30px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 0,
                }, {
                    "type": "image",
                    "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/wx6065082f33eae31b.o6zAJs7pa2Q1niVqKRyvmiuoBz6Q.gDe07p2k340vc0e6d92ba5ae372477471e03e4c04363.jpg",
                    "width": 100,
                    "r": 20,
                    "x": 0,
                    "y": 50,
                }, {
                    "type": "image",
                    "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/wx6065082f33eae31b.o6zAJs7pa2Q1niVqKRyvmiuoBz6Q.gDe07p2k340vc0e6d92ba5ae372477471e03e4c04363.jpg",
                    "width": 100,
                    "x": 150,
                    "y": 50,
                    "rotation": 90,
                    "isCircular": true,
                }, {
                    "type": "circle",
                    "r": 50,
                    "lineWidth": 5,
                    "strokeStyle": "#CCCCCC",
                    "x": 150,
                    "y": 50,
                }]
            }, {
                "type": "group",
                "x": 48,
                "y": 200,
                "children": [{
                    "type": "text",
                    "text": "2.矩形,圆角矩形,圆",
                    "font": "30px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 0,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "lineWidth": 5,
                    "strokeStyle": "#FFFFFF",
                    "x": 00,
                    "y": 50,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "lineWidth": 5,
                    "rotation": 45,
                    "strokeStyle": "#FFFFFF",
                    "linearGradient": [0, 0, 0, 100],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 150,
                    "y": 50,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "linearGradient": [0, 0, 0, 100],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 300,
                    "y": 50,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "r": 20,
                    "lineWidth": 5,
                    "strokeStyle": "#FFFFFF",
                    "x": 0,
                    "y": 180,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "r": 20,
                    "lineWidth": 5,
                    "strokeStyle": "#FFFFFF",
                    "linearGradient": [0, 0, 0, 100],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 150,
                    "y": 180,
                }, {
                    "type": "rect",
                    "width": 100,
                    "height": 100,
                    "r": 20,
                    "lt": false,
                    "rb": false,
                    "linearGradient": [0, 0, 0, 100],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 300,
                    "y": 180,
                }, {
                    "type": "circle",
                    "r": 50,
                    "lineWidth": 5,
                    "strokeStyle": "#FFFFFF",
                    "x": 0,
                    "y": 310,
                }, {
                    "type": "circle",
                    "r": 50,
                    "lineWidth": 5,
                    "linearGradient": [0, 0, 0, 200],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "strokeStyle": "#CCCCCC",
                    "x": 150,
                    "y": 310,
                }, {
                    "type": "circle",
                    "r": 50,
                    "linearGradient": [0, 0, 0, 100],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 300,
                    "y": 310,
                }]
            }, {
                "type": "group",
                "x": 48,
                "y": 640,
                "children": [{
                    "type": "text",
                    "text": "3.文本",
                    "font": "30px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 0,
                }, {
                    "type": "text",
                    "text": "我是一段文字",
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 50,
                }, {
                    "type": "text",
                    "text": "我是一段文字我有阴影",
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 90,
                    "shadow": {
                        "color": "#FFFFFF",
                        "offsetX": 1,
                        "offsetY": 1,
                        "blur": 1
                    }
                }, {
                    "type": "text",
                    "text": "我是一段文字,我会自动换行:有没有那么 永远不改变 拥word抱过的美丽 都再也不mayday破碎 让险峻岁月不能 在脸上撒野 让生离和死别都遥远",
                    "rotation": 90,
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 130,
                    "maxWidth": 300,
                    "lineHeight": 40
                }, {
                    "type": "text",
                    "text": "我是一段文字,我会\n自动换行，我最多只显示两行:有没有那么 永远不改变 拥word抱过的美丽 都再也不mayday破碎 让险峻岁月不能 在脸上撒野 让生离和死别都遥远",
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "x": 0,
                    "y": 380,
                    "maxWidth": 300,
                    "maxLine": 2,
                    "lineHeight": 40
                }, {
                    "type": "text",
                    "text": "我是一段文字，我有渐变色",
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "linearGradient": [0, 0, 200, 0],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 0,
                    "y": 460,
                }, {
                    "type": "text",
                    "text": "aa11人生若只如初见，何事秋风悲画扇11aa",
                    "orientation": "vertical",
                    "font": "24px Arial",
                    "color": "#FFFFFF",
                    "linearGradient": [0, 0, 0, 200],
                    "colors": [[0, '#B0F566'], [0.5, '#4AF2A1'], [1, '#5CC9F5']],
                    "x": 400,
                    "y": 0,
                }]
            }]
    },
    "海报样式1": {
        "width": 750,
        "height": 1334,
        "scale": 0.6,
        "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/bg_concerts_1.jpg",
        "fillStyle": "#CCC",
        "children": [
            {
                "type": "image",
                "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/wxapp_code.jpg",
                "width": 100,
                "x": 48,
                "y": 44,
                "isCircular": true,
            }, {
                "type": "circle",
                "r": 50,
                "lineWidth": 5,
                "strokeStyle": "#CCCCCC",
                "x": 48,
                "y": 44,
            }, {
                "type": "text",
                "text": "歌词本",
                "font": "30px Arial",
                "color": "#FFFFFF",
                "x": 168,
                "y": 75,
                "shadow": {
                    "color": "#000",
                    "offsetX": 2,
                    "offsetY": 2,
                    "blur": 2
                }
            }, {
                "type": "image",
                "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/medal_concerts_1.png",
                "width": 300,
                "x": "center",
                "y": 361
            }, {
                "type": "text",
                "text": "一生活一场 五月天",
                "font": "38px Arial",
                "color": "#FFFFFF",
                "x": "center",
                "y": 838,
                "shadow": {
                    "color": "#000",
                    "offsetX": 2,
                    "offsetY": 2,
                    "blur": 2
                }
            }, {
                "type": "text",
                "text": "北京6场，郑州2场，登船，上班，听到你想听的歌了吗？",
                // "orientation": "vertical",
                "font": "24px Arial",
                "color": "#FFFFFF",
                "x": "center",
                "y": 888,
                "shadow": {
                    "color": "#000",
                    "offsetX": 2,
                    "offsetY": 2,
                    "blur": 2
                }
            }, {
                "type": "rect",
                "width": 750,
                "height": 193,
                "fillStyle": "#FFFFFF",
                "x": 0,
                "y": "bottom"
            }, {
                "type": "image",
                "url": "http://res.mayday5.me/wxapp/wxavatar/tmp/wxapp_code.jpg",
                "width": 117,
                "height": 117,
                "x": 47,
                "y": 1180
            }, {
                "type": "text",
                "text": "长按识别小程序二维码",
                "font": "26px Arial",
                "color": "#858687",
                "x": 192,
                "y": 1202
            }, {
                "type": "text",
                "text": "加入五月天 永远不会太迟",
                "font": "18px Arial",
                "color": "#A4A5A6",
                "x": 192,
                "y": 1249
            }]
    },
    "海报样式2": {
        "width": 750,
        "height": 1370,
        "scale": 0.6,
        "fillStyle": "#FFE410",
        "children": [
            {
                "type": "image",
                "url": "http://blog-res.mayday5.me/img/%E5%8A%A8%E6%80%81%E6%96%87%E6%9C%AC_%E5%A4%B4.jpg",
                "width": 750,
                "height": 70,
                "x": 0,
                "y": 0,
            },
            {
                "type": "group",
                "width": 722,
                "height": 990,
                "fillStyle": "#FFFFFF",
                "r": 20,
                "lb": false,
                "rb": false,
                "x": 14,
                "y": 84,
                "children": [
                    {
                        "type": "image",
                        "url": "https://tvax3.sinaimg.cn/crop.0.0.649.649.180/006Q5oMlly8flbvxffdvdj30i10i17wh.jpg",
                        "width": 80,
                        "x": 48,
                        "y": -40,
                        "isCircular": true,
                    }, {
                        "type": "circle",
                        "r": 40,
                        "lineWidth": 5,
                        "strokeStyle": "#FFFFFF",
                        "x": 48,
                        "y": -40,
                    }, {
                        "type": "text",
                        "text": "小咸鱼",
                        "font": "24px Arial",
                        "color": "#000000",
                        "x": 55,
                        "y": 60
                    }, {
                        "type": "text",
                        "text": "发表了一条动态",
                        "font": "24px Arial",
                        "color": "#BFBFBF",
                        "x": 55,
                        "y": 96
                    }, {
                        "type": "text",
                        "text": "我是一个没有背景色的主题",
                        "font": "24px Arial",
                        "color": "#49A9D6",
                        "textAlign": "right",
                        "x": 690,
                        "y": 79,
                    }, {
                        "type": "text",
                        "text": "6 / 27",
                        "font": "24px Arial",
                        "color": "#BFBFBF",
                        "x": 55,
                        "y": 166
                    }, {
                        "type": "text",
                        "text": "有没有那么一朵玫瑰\n永远不凋谢\n永远骄傲和完美\n永远不妥协\n为何人生最后会像\n一张纸屑\n还不如一片花瓣\n曾经鲜艳\n有没有那么一张书签\n停止那一天\n最单纯的笑脸和\n最美那一年",
                        "maxWidth": 580,
                        "lineHeight": 40,
                        "font": "30px Arial",
                        "color": "#333333",
                        "height": "auto",
                        "uiheight": 750,
                        "x": 55,
                        "y": 206
                    }
                ]
            }, {
                "type": "group",
                "url": "http://blog-res.mayday5.me/img/%E5%8A%A8%E6%80%81%E6%96%87%E6%9C%AC_%E5%B0%BE.jpg",
                "width": 750,
                "height": 318,
                "x": 0,
                "y": 1056,
                "children": [{
                    "type": "text",
                    "font": "24px Arial",
                    "color": "#333333",
                    "text": "我是二维码",
                    "x": 600,
                    "y": 150,
                }]
            }
        ]
    }
}