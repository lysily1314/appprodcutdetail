const app = getApp();
Page({
  data:{
    imageServerPath: app.globalData.imageServerPath
    , pdata:null
  }

  , onLoad: function (option) {
    var _this = this;
    _this.loadProductDetail(option.id);
  }

  , loadProductDetail: function (id) {
    var _this = this;
    if (app.globalData.productRow[id]) {
      _this.setData({
        pdata: app.globalData.productRow[id]
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.requsetSend({
      url: app.getRequsetUrl(app.getConfig('load_detail_url')),
      data: {id: id},
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        var data = res.data.data
        //console.log(data)
        app.globalData.productRow[id] = data
        _this.setData({
          pdata: app.globalData.productRow[id]
        })
      }
    });
  }
  /**
    * 用户点击右上角分享
    */
  , onShareAppMessage: function () {
    return app.initShareData()
  }

});