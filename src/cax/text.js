import { Graphics } from 'cax'
import { isWeapp, getGradient } from './util'

let measureCtx

if (isWeapp) {
  measureCtx = wx.createCanvasContext('measure0')
} else if (typeof document !== 'undefined') {
  measureCtx = document.createElement('canvas').getContext('2d')
}

class Text extends Graphics {
  constructor(option) {
    super()

    option = Object.assign({
      font: '10px sans-serif',
      color: 'black',
      textAlign: 'left',
      baseline: 'top',
      orientation: 'horizontal',
      lineHeight: 0
    }, option)

    if (!option.lineHeight) {
      let result = /\d+px/i.exec(option.font);
      if (result) {
        option.lineHeight = parseFloat(result[0]);
      }
    }

    this.option = option || {}
    this.text = option.text;
  }

  getWidth(word) {
    if (!measureCtx) {
      if (util.isWegame) {
        measureCtx = wx.createCanvas().getContext('2d')
      }
    }

    if (this.option.font) {
      measureCtx.font = this.option.font
    }

    let width = measureCtx.measureText(word || this.text).width;

/*     if (this.option.maxWidth && width > this.option.maxWidth) {
      width = this.option.maxWidth
    } */
    return width
  }

  getHeight() {
    return this.renderBreakLine({ ctx: this, isMeasure: true });
  }

  render(ctx) {
    ctx.fillStyle = getGradient({ option: this.option }) || this.option.color
    ctx.font = this.option.font
    ctx.textAlign = this.option.textAlign
    ctx.textBaseline = this.option.baseline

    if (this.option.orientation === 'vertical') { // 竖排
      this.renderVertical({ ctx });
    } else if (this.option.maxWidth && (this.getWidth() > this.option.maxWidth)) { // 换行
      this.renderBreakLine({ ctx });
    } else {
      ctx.fillText(this.text, 0, 0)
    }
  }

  /**
   * 竖排代码来自 张鑫旭大神 http://www.zhangxinxu.com/wordpress/?p=7362
   * isMeasure 如果为测量模式,只返回计算的文本高度
   */
  renderVertical({ ctx, isMeasure = false }) {
    var arrText = this.text.split('');
    var arrWidth = arrText.map((letter) => {
      return this.getWidth(letter);
    });

    var align = ctx.textAlign;
    var baseline = ctx.textBaseline;

    let x = 0;
    let y = 0;
    let text = this.text;
    if (align == 'left') {
      x = x + Math.max.apply(null, arrWidth) / 2;
    } else if (align == 'right') {
      x = x - Math.max.apply(null, arrWidth) / 2;
    }
    if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
      y = y - arrWidth[0] / 2;
    } else if (baseline == 'top' || baseline == 'hanging') {
      y = y + arrWidth[0] / 2;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
      // 是否需要旋转判断
      let code = letter.charCodeAt(0);

      if (code <= 256) {
        ctx.translate(x, y);
        // 英文字符，旋转90°
        ctx.rotate(90 * Math.PI / 180);
        ctx.translate(-x, -y);
      } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
        // y修正
        y = y + arrWidth[index - 1] / 2;
      }
      ctx.fillText(letter, x, y);

      // 旋转坐标系还原成初始态
      if (code <= 256) {
        ctx.translate(x, y);
        ctx.rotate(-90 * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      // 确定下一个字符的纵坐标位置
      var letterWidth = arrWidth[index];
      y = y + letterWidth;
    });
    // 水平垂直对齐方式还原
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    return y
  }

  /**
   * isMeasure 如果为测量模式,只返回计算的文本高度
   */
  renderBreakLine({ ctx, isMeasure = false }) {
    // coolzjy@v2ex 提供的正则 https://regexr.com/4f12l 优化可断行的位置
    const pattern = /\b(?![\u0020-\u002F\u003A-\u003F\u2000-\u206F\u2E00-\u2E7F\u3000-\u303F\uFF00-\uFF1F])|(?=[\u2E80-\u2FFF\u3040-\u9FFF])/g

    let fillText = ''
    let fillTop = 0
    let lineNum = 1

    //获取可断行的下标
    let breakLines = [];
    this.option.text.replace(pattern, function () {
      breakLines.push(arguments[arguments.length - 2] - 1);
    });

    let tempBreakLine = 0;
    for (let i = 0; i < this.option.text.length; i++) {
      if (breakLines.indexOf(i) !== -1) {
        tempBreakLine = i;
      }

      fillText += [this.option.text[i]]

      // 支持 \n 换行
      if (this.getWidth(fillText) > this.option.maxWidth || this.option.text[i].charCodeAt(0) === 10) {
        let tempText = '';
        //最大行数限制
        if (lineNum === this.option.maxLine && i !== this.option.text.length) {
          tempText = fillText.substring(0, fillText.length - 1) + '...';
          fillText = '';
        } else {
          if (tempBreakLine === i || this.option.text[i].charCodeAt(0) === 10) {
            tempText = fillText;
            fillText = '';
          } else {
            tempText = fillText.substring(0, fillText.length - (i - tempBreakLine));
            fillText = fillText.substring(fillText.length - (i - tempBreakLine), fillText.length);
          }
        }

        if (this.option.text[i].charCodeAt(0) === 10) {
          tempText = tempText.substring(0, tempText.length - 1);
        }
        !isMeasure && ctx.fillText(tempText, 0, fillTop)

        if (lineNum === this.option.maxLine && i !== this.option.text.length) {
          break;
        }

        fillTop += this.option.lineHeight || 0;
        lineNum++
      }
    }

    if (fillText) {
      !isMeasure && ctx.fillText(fillText, 0, fillTop)
    }

    return fillTop + this.option.lineHeight
  }
}

export default Text