// pages/test/test.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    // 自定义page对象CSS样式对象
    openid:"",
    resultImg:"",
    src: 'https://rb.sunlands.com/images/ResultInquiryImages/music.wav',

    catalogs: [
      {
        "catalogText": "https://rb.sunlands.com/images/ResultInquiryImages/test6wz1.png",
        "catalogBorder": "https://rb.sunlands.com/images/ResultInquiryImages/b.png",
        "select": 1
      },
      {
        "catalogText": "https://rb.sunlands.com/images/ResultInquiryImages/test6wz2.png",
        "catalogBorder": "https://rb.sunlands.com/images/ResultInquiryImages/b.png",
        "select": 2
      },
      {
        "catalogText": "https://rb.sunlands.com/images/ResultInquiryImages/test6wz3.png",
        "catalogBorder": "https://rb.sunlands.com/images/ResultInquiryImages/b.png",
        "select": 3
      },
    ],
    catalogSelect: 0,//判断是否选中
  },
  chooseCatalog: function (data) {
    var that = this;
    that.setData({
      //把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      openid: options.openid,
      resultImg: options.resultImg
    })
    
  },
  DownPage: function () {
    if (this.audioCtx !== null) {
  
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
  
        that.audioCtx.pause();// 暂停
      }, 300)
    }
    if (this.data.catalogSelect == 0) {
      wx.showToast({
        title: '请选择选项',
        icon: 'loading',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../test7/test7?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
 
})