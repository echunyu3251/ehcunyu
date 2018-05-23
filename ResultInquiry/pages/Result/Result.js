
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ImgUrlList: ["Random1", "Random2", "Random3", "Random4", "Random5", "Random6", "Random7"],
    RandomImgUrl: "",
    ImgUrl: '',
    openid: "",
    resultImg: "",
    src: 'https://rb.sunlands.com/images/ResultInquiryImages/music.wav'

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var openid = options.openid;
    var resultImg=options.resultImg;  
    this.setData({
      openid: openid,
      resultImg: resultImg
    })
    if (resultImg === "" || resultImg == "null" || resultImg == null) {
      var that = this
      randomImgUrl()
      function randomImgUrl() {
        var num = Math.floor(Math.random() * that.data.ImgUrlList.length);
        that.setData({
          RandomImgUrl: "https://rb.sunlands.com/images/ResultInquiryImages/" + that.data.ImgUrlList[num] + ".png"
        })
        var img = that.data.RandomImgUrl.slice(0, 58) + '.jpg';
        that.setData({
          ImgUrl: img
        })
        wx.request({
          url: "https://rb.sunlands.com/summary/exam/saveResult.do",
          data: {
            openid: that.data.openid,
            resultImg: that.data.RandomImgUrl
          },
          success: function (res) {
          },
          fail: function (res) {
          }
        })
      }
    } else {
      var that = this;
      var img = that.data.resultImg.slice(0, 58) + '.jpg';
          that.setData({
            RandomImgUrl: that.data.resultImg ,
            ImgUrl: img
          })
    }
  },
  ResultSearch: function () {
    if (this.audioCtx !== null) {
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
        that.audioCtx.pause();// 暂停
      }, 300)
    }
    wx.navigateTo({
      url: '../search/search?openid=' + this.data.openid + "&resultImg=" + this.data.resultImg,
    })
  },
  saveImgUrl: function () {
    if (this.audioCtx !== null) {
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
        that.audioCtx.pause();// 暂停
      }, 300)
    }
    wx.downloadFile({
      url: this.data.ImgUrl,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log("获取权限失败")
                  }
                }
              })
            }
          }
        })
      }
    })
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

})