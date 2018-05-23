//index.js
//获取应用实例
const app = getApp()
let flag = true
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    GetInto: [],
    openid: "",
    resultImg: "",
    BJT: "100% 100%",
    src: 'https://rb.sunlands.com/images/ResultInquiryImages/music.wav'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
    })
  },
  test: function () {
    if (this.audioCtx !== null) {
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
        that.audioCtx.pause();// 暂停
      }, 300)
    }
    if (this.data.resultImg == "" || this.data.resultImg === null) {
      wx.navigateTo({
        url: '../test/test?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
      })
    } else {
      wx.navigateTo({
        url: '../Result/Result?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
      })
    }
  },
  search: function () {
    wx.navigateTo({
      url: '../search/search?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
    })
    if (this.audioCtx !== null) {
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
        that.audioCtx.pause();// 暂停
      }, 300)
    }
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    if (that.openid !== "") {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code)
          wx.request({
            url: 'https://rb.sunlands.com/summary/exam/getSessionInfo.do?code=' + res.code,
            success: function (data) {
              console.log(data)
              if (data.data.resultImg === null || data.data.resultImg === "") {
                that.setData({
                  GetInto: "https://rb.sunlands.com/images/ResultInquiryImages/jr.png"
                })
              } else {
                that.setData({
                  GetInto: "https://rb.sunlands.com/images/ResultInquiryImages/jr2.png"
                })
              }
              that.setData({
                openid: data.data.openid,
                resultImg: data.data.resultImg
              })
            }
          })
        }
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code)
          wx.request({
            url: 'https://rb.sunlands.com/summary/exam/getSessionInfo.do?code=' + res.code,
            success: function (data) {
              console.log(data.data)
              if (data.data.resultImg === null || data.data.resultImg === "") {
                that.setData({
                  GetInto: "https://rb.sunlands.com/images/ResultInquiryImages/jr.png"
                })
              } else {
                that.setData({
                  GetInto: "https://rb.sunlands.com/images/ResultInquiryImages/jr2.png"
                })
              }
              that.setData({
                openid: data.data.openid,
                resultImg: data.data.resultImg
              })
            }
          })
        }
      })
    }

    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          getApp().globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //转发
  onShareAppMessage: function () {
    return {
      title: '一分钟测出你是哪种学习型人格',
      imageUrl: "https://rb.sunlands.com/images/ResultInquiryImages/fenxiangTitle.jpg",
      path: '/pages/index/index',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
