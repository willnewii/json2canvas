// pages/poster.js
import data from './data'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    painting: data[1],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      painting: data[options.type]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getImage(e) {
    console.log(e.detail);
  },
})