import cax from "cax";

const isWeapp = typeof wx !== 'undefined' && !wx.createCanvas;
const TYPE = {
    rect: 'rect',
    circle: 'circle',
    image: 'image',
    text: 'text',
    group: 'group'
};

let stage = null;
let imageMap = new Map();

function draw(option, selecter, page = null, callback) {
    option = Object.assign({
        scale: 1,
    }, option)

    const params = [option.width * option.scale, option.height * option.scale, selecter];
    if (isWeapp) {
        stage = new cax.Stage(...params, page);
    } else {
        stage = new cax.Stage(...params);
    }
    stage.scale = option.scale;

    // 获取所有元素的图片链接
    let preImgs = getUrls(option);

    Promise.all(preImgs).then((results) => {
        results.forEach(({ url, bitmap }) => {
            imageMap.set(url, bitmap);
        });

        handleElements({ option });

        stage.children.reverse();
        stage.update();
        setTimeout(() => {
            callback && callback();
        }, 800)
    });
}

function handleElements({ option, parent }) {
    const caxGroup = new cax.Group();
    option.width && (caxGroup.width = option.width);
    option.height && (caxGroup.height = option.height);

    setPosition(caxGroup, option, parent);

    option.children.forEach((child) => {
        let ele = null;
        let param = { option: child, parent: caxGroup };
        switch (child.type) {
            case TYPE.group:
                handleElements(param);
                break;
            case TYPE.rect:
            case TYPE.circle:
                ele = handleGraphics(param);
                break;
            case TYPE.image:
                ele = handleImage(param);
                break;
            case TYPE.text:
                ele = handleText(param);
                break;
        }
        ele && caxGroup.add(ele);
    });

    stage.add(caxGroup);
}

function handleGraphics({ option, parent }) {
    option = Object.assign({
        lineWidth: 1,
        lt: true,
        rt: true,
        lb: true,
        rb: true
    }, option)
    const ele = new cax.Graphics();
    ele.beginPath();

    switch (option.type) {
        case TYPE.rect:
            if (option.r > 0) {
                setRoundedRect({ ele, option });
            } else {
                ele.rect(0, 0, option.width, option.height)
            }
            break;
        case TYPE.circle:
            ele.arc(0, 0, option.r, 0, Math.PI * 2, false);
            break;
    }

    ele.closePath();

    let gradient = getGradient({ option });

    //如果fillStyle&strokeStyle 都不填,默认fillStyle
    if (gradient && !option.fillStyle && !option.strokeStyle) {
        option.fillStyle = '#FFFFFF'
    }

    if (option.fillStyle) {
        ele.fillStyle(gradient || option.fillStyle);
        ele.fill();
    } else if (option.strokeStyle) {
        ele.lineWidth(option.lineWidth)
        ele.strokeStyle(gradient || option.strokeStyle);
        ele.stroke();
    }

    setPosition(ele, option, parent);
    return ele;
}

function handleImage({ option, parent }) {
    let bitmap = imageMap.get(option.url);

    //标记位,如果一张图用到两次,应该clone.
    bitmap.used && (bitmap = bitmap.clone())

    if (bitmap) {
        bitmap.used = true;
        let width = bitmap.width;

        // 缩放
        bitmap.scale = option.width / width;
        setPosition(bitmap, option, parent);

        //圆角
        if (option.isCircular) {
            const clipPath = new cax.Graphics();
            clipPath.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2);
            bitmap.clip(clipPath);
        }

        return bitmap;
    }
    return null;
}

function handleText({ option, parent }) {
    let text = getBaseText(option);
    // coolzjy@v2ex 提供的正则 https://regexr.com/4f12l 
    const pattern = /\b(?![\u0020-\u002F\u003A-\u003F\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F\uFF00-\uFF1F])|(?=[\u2E80-\u2FFF\u3040-\u9FFF])/g

    if (option.maxWidth && (text.getWidth() > option.maxWidth)) {//折行处理
        let fillText = ''
        let fillTop = option.y
        let lineNum = 1

        //获取可折行的下标
        let breakLines = [];
        option.text.replace(pattern, function () {
            breakLines.push(arguments[arguments.length - 2] - 1);
        });

        let tempBreakLine = 0;
        for (let i = 0; i < option.text.length; i++) {
            if (breakLines.indexOf(i) !== -1) {
                tempBreakLine = i;
            }

            fillText += [option.text[i]]
            text.text = fillText
            if (text.getWidth() > option.maxWidth) {
                let temp = getBaseText(option);

                if (lineNum === option.maxLine && i !== option.text.length) {
                    temp.text = fillText.substring(0, fillText.length - 1) + '...';
                    fillText = '';
                } else {
                    if (tempBreakLine === i) {
                        temp.text = fillText;
                        fillText = '';
                    } else {
                        temp.text = fillText.substring(0, fillText.length - (i - tempBreakLine));
                        fillText = fillText.substring(fillText.length - (i - tempBreakLine), fillText.length);
                    }
                }
                _setPosition({ ele: temp, option, value: 'x', parent });
                temp.y = fillTop;
                parent.add(temp);

                if (lineNum === option.maxLine && i !== option.text.length) {
                    break;
                }

                fillTop += option.lineHeight || 0;
                lineNum++
            }
        }

        if (!fillText) {
            return;
        }

        text.text = fillText;
        _setPosition({ ele: text, option, value: 'x', parent });
        text.y = fillTop;
    } else {
        setPosition(text, option, parent);
    }
    return text;
}

function setRoundedRect({ ele, option }) {
    const r = option.r,
        ax = option.r,
        ay = 0,
        bx = option.width,
        by = 0,
        cx = option.width,
        cy = option.height,
        dx = 0,
        dy = option.height,
        ex = 0,
        ey = 0

    ele.moveTo(ax, ay)
    if (option.rt) {
        ele.arcTo(bx, by, cx, cy, r)
    } else {
        ele.lineTo(bx, by)
    }

    if (option.rb) {
        ele.arcTo(cx, cy, dx, dy, r)
    } else {
        ele.lineTo(cx, cy)
    }

    if (option.lb) {
        ele.arcTo(dx, dy, ex, ey, r)
    } else {
        ele.lineTo(dx, dy)
    }

    if (option.lt) {
        ele.arcTo(ex, ey, ax, ay, r)
    } else {
        ele.lineTo(ex, ey)
    }
}

/**
 * 
 * @param {*} ele canvas元素
 * @param {*} option 配置参数
 * @param {*} parent 父元素,用于计算相对位置
 */
function setPosition(ele, option, parent) {
    _setPosition({ ele, option, value: 'x', parent });
    _setPosition({ ele, option, value: 'y', parent });
}

/**
 *
 * @param ele 处理的方向关键词 center / bottom
 * @param option
 * @param value 【x,y】
 */
function _setPosition({ ele, option, value, parent }) {
    switch (option[value]) {
        case 'center':
            switch (option.type) {
                case TYPE.image:
                    ele[value] = (parent.width - ele.width * ele.scale) / 2;
                    break;
                case TYPE.text:
                    ele[value] = (parent.width - ele.getWidth()) / 2;
                    break;
            }
            break;
        case 'bottom':
            switch (option.type) {
                case TYPE.image:
                    ele[value] = (parent ? parent.height : (option.height / option.scale)) - ele.height * ele.scale;
                    break;
                case TYPE.rect:
                case TYPE.group:
                    ele[value] = (parent ? parent.height : (option.height / option.scale)) - option.height;
                    break;
            }
            break;
        default:
            switch (option.type) {
                case TYPE.circle:
                    ele[value] = option[value] + option.r;
                    break;
                default:
                    ele[value] = option[value] || 0;
                    break;
            }
    }
}

function getCtx(){
    return isWeapp ? stage.ctx : stage.canvas.getContext("2d")
}

function getGradient({ option }) {
    let gradient = null;
    if (option.linearGradient && option.colors) {
        gradient = getCtx().createLinearGradient(...option.linearGradient);
        for (let i = 0; i < option.colors.length; i++) {
            gradient.addColorStop(...option.colors[i]);
        }
    }
    return gradient;
}

function getBaseText(option) {
    const text = new cax.Text(option.text, {
        font: option.font,
        color: option.color,
        baseline: 'top'
    });

    let gradient = getGradient({ option });
    if (gradient) {
        text.color = gradient;
    }

    if (option.shadow) {
        text.shadow = option.shadow;
    }

    return text;
}

/**
 * 加载图片
 */
function loadImage(url) {
    return new Promise((resolve, reject) => {
        if (isWeapp) {
            wx.getImageInfo({
                src: url,
                success(res) {
                    new cax.Bitmap(res.path.startsWith('http') ? res.path : url, function () {
                        resolve({ url, bitmap: this });
                    });
                },
                fail(res) {
                    console.error(res);
                    resolve({ url, bitmap: null });
                }
            });
        } else {
            const img = new Image()
            // img.crossOrigin = '';
            img.onload = function () {
                new cax.Bitmap(url, function () {
                    resolve({ url, bitmap: this });
                });
            };
            img.onerror = function (res) {
                console.error(res);
                resolve({ url, bitmap: null });
            };
            img.src = url;
        }
    });
}

/**
 * 获取元素中的所有链接
 * @param {*} group 
 */
function getUrls(group) {
    let imgs = [];
    let tempUrls = [];
    group.children.forEach((child) => {
        if (child.type === TYPE.image) {
            if (tempUrls.indexOf(child.url) === -1) {
                tempUrls.push(child.url);
                imgs.push(loadImage(child.url));
            }
        } else if (child.type === TYPE.group) {
            imgs.push(...getUrls(child))
        }
    })
    return imgs;
}

export { draw }