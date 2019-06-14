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
    if (!option.scale) {
        option.scale = 1;
    }

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
                ele = handleRect(param);
                break;
            case TYPE.circle:
                ele = handleCircle(param);
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

function handleCircle({ option, parent }) {
    const ele = new cax.Circle(option.r, option);
    setPosition(ele, option, parent);
    ele.draw();
    return ele;
}

function handleRect({ option, parent }) {
    const ele = new cax.Graphics();
    ele
        .beginPath()
        .rect(0, 0, option.width, option.height)
        .closePath();

    if (option.fillStyle) {
        ele.fillStyle(option.fillStyle);
        ele.fill();
    } else if (option.linearGradient && option.colors) {
        ele.createLinearGradient(...option.linearGradient);
        for (let i = 0; i < option.colors.length; i++) {
            ele.addColorStop(...option.colors[i]);
        }
        ele.fillGradient();
        ele.fill();
    } else if (option.strokeStyle) {
        ele.strokeStyle(option.strokeStyle);
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

    if (option.maxWidth && (text.getWidth() > option.maxWidth)) {//折行处理
        let fillText = ''
        let fillTop = option.y
        let lineNum = 1
        for (let i = 0; i < option.text.length; i++) {
            fillText += [option.text[i]]
            text.text = fillText
            if (text.getWidth() > option.maxWidth) {
                let temp = getBaseText(option);
                temp.text = (lineNum === option.maxLine && i !== option.text.length) ? fillText.substring(0, fillText.length - 1) + '...' : fillText;
                _setPosition({ ele: temp, option, value: 'x', parent });
                temp.y = fillTop;
                parent.add(temp);
                fillText = '';

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

function getBaseText(option) {
    const text = new cax.Text(option.text, {
        font: option.font,
        color: option.color,
        baseline: 'top'
    });

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