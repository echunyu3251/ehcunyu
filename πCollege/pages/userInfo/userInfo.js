// pages/userInfo/userInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name_foc: true,
    downPageImg: "",    
    user_head: "",
    name_value: "",
    gs_value: "",
    zw_value: "",
    address_value: "",
    ID_value: "123",
    tel_value: "",
    email_value: "",
    xyInfo_value: "",
    zy_value: "",
    time_value: "",
    school_value: "",
    array: ['女', '男'],
    index: 0,
    name:""
  },
  // 上传头像
  headUpPage:function(){
      wx.navigateTo({
        url: '../up_head/up_head',
      })
  },
  
  up_head: function () {

  },
  // 性别
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  // 行业
  industry: function () {
    wx.navigateTo({
      url: '../industry_page/industry_page',
    })
  },
  // 姓名
  bindname: function (e) {
    console.log(e.detail.value)
    this.setData({
      name_value: e.detail.value
    })
  },
  //公司
  bindgs: function (e) {
    console.log(e.detail.value)
    gs_value: e.detail.value
  },
  //职位
  bindzw: function (e) {
    console.log(e.detail.value)
    zw_value: e.detail.value
  },
  //地址
  bindaddress: function (e) {
    console.log(e.detail.value)
    address_value: e.detail.value
  },
  // id
  bindID: function (e) {
    console.log(e.detail.value)
    ID_value: e.detail.value
  },
  //电话
  bindtel: function (e) {
    console.log(e.detail.value)
    tel_value: e.detail.value
  },
  //邮箱
  bindemail: function (e) {
    console.log(e.detail.value)
    email_value: e.detail.value
  },
  //学院信息
  bindxyInfo: function (e) {
    console.log(e.detail.value)
    xyInfo_value: e.detail.value
  },
  //专业
  bindzy: function (e) {
    console.log(e.detail.value)
    zy_value: e.detail.value
  },

  // 就业时间
  bindtime: function (e) {
    console.log(e.detail.value)
    time_value: e.detail.value
  },
  // 学校
  bindschool: function (e) {
    console.log(e.detail.value)
    school_value: e.detail.value
  },

  storage: function () {
    var name = this.data.name_value
    var gs = this.data.gs_value
    var zw = this.data.zw_value
    var tel = this.data.tel_value
    var email = this.data.email_value
    var xyInfo = this.data.xyInfo_value
    var zy = this.data.zy_value
    var time = this.data.time_value   
    var userInfo_data={
      "姓名": this.data.name_value,
      "公司": this.data.gs_value,
      "职位": this.data.gs_value,
      "电话": this.data.gs_value,
      "邮箱": this.data.gs_value,
      "公司": this.data.gs_value,
      "公司": this.data.gs_value,
      "公司": this.data.gs_value,
      
    }        
    if (this.name == "" || this.gs == "" || this.zw == "" || this.tel == "" || this.email == "" || this.xyInfo == "" || this.zy == "" || this.time == ""){
      wx.showToast({
        title: '填写全部信息',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }else{
      wx.request({
        url: 'https://rb.sunlands.com/social/web/person/savePerson',
        data: {
          name: name
        },
        success: function (res) {
          console.log(res.statusCode)
          var succCode = res.statusCode
          if (succCode === 200) {
            wx.showToast({
              title: '保存成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            wx.setStorageSync("successCode","success" )
          } else if (succCode !== 200){
            wx.setStorageSync("errCode", "error")
          }
        },
        fail: function (res) {
          console.log(res, 2)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    console.log(that.data.downPageImg)
    var getImg = wx.getStorageSync("imgData")
   
    if (that.data.downPageImg ==""){
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          var avatarUrl = res.userInfo.avatarUrl
          that.setData({
            downPageImg: avatarUrl
          })
        }
      })
    }else{
      console.log(getImg, 1111)
      that.setData({
        downPageImg: getImg
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