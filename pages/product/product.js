const app = getApp();
Page({
  data: {
    summary:null
  }
  , onLoad: function () {
    var _this = this;
    if (app.globalData.summaryList) {
      _this.setData({
        summary: app.globalData.summaryList
      })
    } else {
      app.onReadyInitCallback = res => {
        app.globalData.summaryList = res.data.summary
        _this.setData({
          summary: res.data.summary,
        })
      }
    }
  }

  /**
  * 用户点击右上角分享
  */
  , onShareAppMessage: function () {
    return app.initShareData()
  }
});