// pages/up_head/up_head.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: []
  },
  choseImg: function () {
    console.log(1)
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        that.setData({ img: res.tempFilePaths })

      }
    })
  },
  up_img:function(){
      // console.log(this.data.img,2)
      // var pages = getCurrentPages();
      // var currPage = pages[pages.length - 1];  //当前页面
      // var prevPage = pages[pages.length - 2]; //上一个页面
      // console.log(pages.length, "length")
      // console.log(pages, "pages")
      // console.log(currPage, "currPage")
      // console.log(prevPage, "prevPage")
      // console.log(prevPage.data)
      // prevPage.setData({
      //   downPageImg: this.data.img,
      //   user_head:"1"
      // })
     
    
    if (this.data.img ==""){
      wx.showToast({
        title: '上传失败',
        icon:"loading"
        
      })
    }else{
      var setImg = wx.setStorageSync("imgData", this.data.img)
      wx.showToast({
        title: '上传成功',
        duration: 5000
       
      })
      setTimeout(function(){
        wx.navigateTo({
          url: '../userInfo/userInfo',
        })
      },5000)
     
    }
  
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})