/**
 * 根据配置获取渐变色
 * @param {*} param0 
 */
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

function getCtx() {
    if (isWeapp) {
        return wx.createCanvasContext('measure0')
    } else if (typeof document !== 'undefined') {
        return document.createElement('canvas').getContext('2d')
    }
    return null;
    // return isWeapp ? stage.ctx : stage.canvas.getContext("2d")
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const isWeapp = typeof wx !== 'undefined' && !wx.createCanvas && wx.createCanvasContext;
const isWegame = typeof wx !== 'undefined' && wx.createCanvas;

const TYPE = {
    rect: 'rect',
    circle: 'circle',
    image: 'image',
    text: 'text',
    group: 'group'
};

export { getGradient, isWeapp, isWegame, TYPE, copy }