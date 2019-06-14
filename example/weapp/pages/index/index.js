//index.js

Page({
  data: {
  },
  //事件处理函数
  bindViewTap: function(e) {
    wx.navigateTo({
      url: `../poster/poster?type=${e.currentTarget.dataset.type}`
    })
  },
  onLoad: function () {
  },
})
