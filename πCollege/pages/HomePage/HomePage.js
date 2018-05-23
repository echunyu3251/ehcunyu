// pages/HomePage/HomePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    decode: true,
    hidden:false,
    img1: [
      'https://rb.sunlands.com/images/College/huodong_img.png',
      'https://rb.sunlands.com/images/College/NR_img.png',
      'https://rb.sunlands.com/images/College/huodong_img.png',
      'https://rb.sunlands.com/images/College/NR_img.png',
      'https://rb.sunlands.com/images/College/huodong_img.png',
      'https://rb.sunlands.com/images/College/NR_img.png'

    ],
    imgUrls: [

      { "id": 1, "img": 'https://rb.sunlands.com/images/College/swiper1.jpg' },
      { "id": 2, "img": 'https://rb.sunlands.com/images/College/swiper1.jpg' },
      { "id": 3, "img": 'https://rb.sunlands.com/images/College/swiper1.jpg' },
      { "id": 4, "img": 'https://rb.sunlands.com/images/College/swiper1.jpg' }



    ],
    imgUrls2: [

    ],
    id: 0,
    //判断是否选中
    changeSelect: 0
  },


  changID: function (e) {
    // console.log(e)
    var that = this;
    that.setData({
      //把选中值放入判断值
      // changeSelect: data.currentTarget.dataset.select
    })
  },
  Release: function () {
    wx.navigateTo({
      url: '../Release/Release',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var getCode = wx.getStorageSync("successCode");
  if (getCode === "success"){

  } else if (getCode !== "success"){
    wx.showModal({
      title: '提示',
      content: '请完善个人资料!!!',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../userInfo/userInfo',
          })
         
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
    


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://rb.sunlands.com/social/web/carousel/searchTop',
      success: function (data) {
        // console.log(data.data)
        that.setData({
          imgUrls2: data.data
        })

      }
    })
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
  onReachBottom: function (e) {
      console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})