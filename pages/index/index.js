const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageServerPath: app.globalData.imageServerPath
    , category:null
    , summary: null
    , banner: null
    , isLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.categoryList){
        _this.setData({
          category: app.globalData.categoryList,
          summary: app.globalData.summaryList,
          banner: app.globalData.bannerList,
          isLoading:''
        })
    }else{
      app.onReadyInitCallback = res =>{
        app.globalData.categoryList = res.data.category
        app.globalData.summaryList = res.data.summary
        app.globalData.bannerList = res.data.banner
        _this.setData({
          category: res.data.category,
          summary: res.data.summary,
          banner: res.data.banner,
          isLoading: ''
        })
      }
    }
  }
  , goCategory:function(e){
    app.globalData.selectCategoryId = e.currentTarget.dataset.id
    //console.log(app.globalData.selectCategoryId)
    wx.switchTab({
      url: '/pages/category/category',
    }) 
  }

  
  /**
   * 用户点击右上角分享
   */
  ,onShareAppMessage: function () {
    return app.initShareData()
  }
})