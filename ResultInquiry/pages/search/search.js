// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    resultImg: "",
    display: "none",
    array: ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '贵州省', '云南省', '陕西省', '甘肃省', '西藏自治区', '内蒙古自治区', '广西壮族自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区', '台湾省'],
    index: 0,
    hidden: true,
    iconColor: [
      'purple'
    ],
    iconType: [
      'clear',
    ],
    userName: "",
    tel: "",
    diqu: "",
    CertificatesNumber: "",
    password: "",
    src: 'https://rb.sunlands.com/images/ResultInquiryImages/music.wav'
  },
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
      resultImg: options.resultImg
    })
    wx.hideKeyboard();

    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    if (that.openid === "") {
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
  },
  HideProvincesList: function (e) {
    this.setData({
      display: "none"
    })
  },
  listenerPickerSelected: function (e) {
    
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  },
  //获取用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //获取手机号
  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //获取准考证号
  CertificatesNumberInput: function (e) {
    this.setData({
      CertificatesNumber: e.detail.value
    })
  },
  //获取密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 点击提交显示提示信息
  SearchSubmit: function (e) {
    if (this.audioCtx !== null) {
      this.audioCtx.play();// 播放
      var that = this
      setTimeout(function () {
        that.audioCtx.pause();// 暂停
      }, 300)
    }
    // var reg = ; (\u4E00-\u9FA5) 
    var that = this;  
   var regExp = /^[\x00-\xff]+$/;
    if (that.data.userName === "" ||
      that.data.tel === "" ||
      that.data.array[that.data.index] === "" || that.data.CertificatesNumber === "" ||
      that.data.password === "" ) {
      wx.showToast({
        title: '请填写全部信息',
        icon: 'none',
        duration: 2000      
      })
    } else if (regExp.test(that.data.CertificatesNumber) == false){
      wx.showToast({
        title: '准考证输入有误',
        icon: 'none',
        duration: 2000
      })
    }
     else if (regExp.test( that.data.password) == false){
      wx.showToast({
        title: '密码输入有误',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      wx.request({
        url: 'https://rb.sunlands.com/summary/exam/saveExamInfo.do',
        data: {
          openid: this.data.openid,
          name: this.data.userName,
          mobile: this.data.tel,
          area: that.data.array[that.data.index],
          examNo: this.data.CertificatesNumber,
          remark: this.data.password
        },
        success: function (res) {
          if (res.data.resultCode == 0) {
            that.setData({
              userName: "",
              tel: "",
              CertificatesNumber: "",
              password: ""
            })
            wx.showToast({
              title: '信息提交成功 ',
              icon: 'success',
              duration: 2000
            })

          } else {
            wx.showToast({
              title: '信息提交失败 ',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  // 转发
  onShareAppMessage: function (res) {
    return {
      title: '一分钟测出你是哪种学习型人格',
      imageUrl: "https://rb.sunlands.com/images/ResultInquiryImages/fenxiangTitle.jpg",
      path: '/pages/index/index',
      success: function (res) {
      },
      fail: function (res) {

      }
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