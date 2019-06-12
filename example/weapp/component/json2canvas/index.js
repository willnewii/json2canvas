import * as json2canvas from "json2canvas";

Component({
  properties: {
    painting: {
      type: Object,
      value: {},
    },
    showCanvas: {
      type: Boolean,
      value: false,
    }
  },
  observers: {
    'painting': function (value) {
      if (!this.data.isPainting) {
        if (JSON.stringify(value)) {
          if (value && value.width && value.height) {
            this.setData({
              isPainting: true
            })
            this.readyPigment()
          }
        }
      }
    }
  },
  data: {
    caxId: 'caxId-' + new Date().getTime(),
    canvasId: '',
    width: 100,
    height: 100,
    isPainting: false
  },
  ctx: null,
  lifetimes: {
    ready() {
      const caxComponent = this.getCaxComponent();
      this.setData({
        canvasId: caxComponent.data.id
      })
    }
  },
  methods: {
    getCaxComponent() {
      return this.selectComponent('#' + this.data.caxId);
    },
    readyPigment() {
      const inter = setInterval(() => {
        if (this.data.canvasId) {
          clearInterval(inter)
          this.setData({
            isPainting: true,
          })

          json2canvas.draw(this.data.painting, this.data.caxId, this, () => {
            this.setData({
              isPainting: false,
            })
            this.saveImageToLocal();
          });
        }
      }, 100)
    },
    saveImageToLocal() {
      const { width, height, scale } = this.data.painting;

      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width * scale,
        height: height * scale,
        canvasId: this.data.canvasId,
        complete: res => {
          if (res.errMsg === 'canvasToTempFilePath:ok') {
            this.setData({
              isPainting: false,
            })
            this.triggerEvent('getImage', { tempFilePath: res.tempFilePath, errMsg: 'canvasdrawer:ok' })
          } else {
            this.triggerEvent('getImage', { errMsg: 'canvasdrawer:fail' })
          }
        }
      }, this.getCaxComponent())
    }
  }
})