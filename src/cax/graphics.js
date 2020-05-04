import { Graphics as _Graphics } from 'cax'
import { getGradient, TYPE } from './util'

class Graphics extends _Graphics {
  constructor(option) {
    super()
    option = Object.assign({
      lineWidth: 1,
      lt: true,
      rt: true,
      lb: true,
      rb: true
    }, option)
    this.beginPath();

    switch (option.type) {
      case TYPE.rect:
        if (option.r > 0) {
          this.setRoundedRect(option);
        } else {
          this.rect(0, 0, option.width, option.height)
        }
        break;
      case TYPE.circle:
        this.arc(0, 0, option.r, 0, Math.PI * 2, false);
        break;
    }

    this.closePath();

    let gradient = getGradient({ option });

    //如果fillStyle&strokeStyle 都不填,默认fillStyle
    if (!('fillStyle' in option) && !option.strokeStyle) {
      option.fillStyle = '#FFFFFF'
    }

    if (option.fillStyle) {
      this.fillStyle(gradient || option.fillStyle);
      this.fill();
    } else if (option.strokeStyle) {
      this.lineWidth(option.lineWidth)
      this.strokeStyle(gradient || option.strokeStyle);
      this.stroke();
    }

  }

  /**
   * 设置圆角矩形(https://github.com/dntzhang/cax/blob/master/packages/cax/src/render/display/shape/rounded-rect.js)
   */
  setRoundedRect(option) {
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

    this.moveTo(ax, ay)
    if (option.rt) {
      this.arcTo(bx, by, cx, cy, r)
    } else {
      this.lineTo(bx, by)
    }

    if (option.rb) {
      this.arcTo(cx, cy, dx, dy, r)
    } else {
      this.lineTo(cx, cy)
    }

    if (option.lb) {
      this.arcTo(dx, dy, ex, ey, r)
    } else {
      this.lineTo(dx, dy)
    }

    if (option.lt) {
      this.arcTo(ex, ey, ax, ay, r)
    } else {
      this.lineTo(ex, ey)
    }
  }
}

export default Graphics