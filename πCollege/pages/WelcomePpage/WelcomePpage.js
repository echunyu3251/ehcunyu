// pages/qd_page/qd_page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bottom: "0%",
    w: "",
    h: ""
  },
  // userInfoHandler:function(e){
  //     console.log(e)
  // },
  // getUserInfo1: function (e) {
  //   console.log(e, 2222)
  //   wx.getSetting({
  //     success: (res) => {
  //       console.log(res)
  
  //     }
  //   })

  // },
  login: function () {
    //登录
    wx.login({
      success: function (res) {        
        // code换openID
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://rb.sunlands.com/social/web/user/getSessionInfo?code=' + res.code,
            success: function (data) {
              console.log(data)
              wx.getUserInfo({
                success: function (res) {
                      console.log(res,1)
                      if (res.errMsg =="getUserInfo:ok"){
                        wx.switchTab({
                          url: '../HomePage/HomePage',
                        })
                      }
                },
                fail: function (res) {
                  console.log(res,2)
                  if (res.errMsg == "getUserInfo:fail scope unauthorized") {
                    wx.navigateTo({
                      url: '../cxsq/cxsq',
                    })
                  }
                }
              })

             
            }, fail: function (data) {
              console.log("err" + data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var w = res.windowWidth;
        var h = res.windowHeight;
        that.setData({
          w: w,
          h: h,
        })
        if (h <= 603) {
          that.setData({
            bottom: 0
          })
        } else if (h >= 604 && h <= 672) {
          that.setData({
            bottom: 0
          })
        } else if (h >= 673 && h <= 724) {
          that.setData({
            bottom: 10
          })
        }
      }
    })
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