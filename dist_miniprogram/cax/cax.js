Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCanvas: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCanvas: false,
    width: 0,
    height: 0,
    id: 'caxCanvas' + new Date().getTime(),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCaxCanvasId: function () {
      return this.data.id
    },
  }
})
