const app = getApp();
Page({

  data:{
    imageServerPath: app.globalData.imageServerPath
    , category:null
    , selectCategoryId:0
    , dataList:null
  }

  , onLoad:function(){
    var _this = this;
    //console.log(app.globalData.categoryList)
  }
  
  , onShow:function(){
    var _this = this;
    if (app.globalData.categoryList) {
      _this.setData({
        category: _this.parseCategory(app.globalData.selectCategoryId,app.globalData.categoryList)
      })
    } else {
      app.onReadyInitCallback = res => {
        app.globalData.categoryList = res.data.category
        _this.setData({
          category: _this.parseCategory(app.globalData.selectCategoryId,res.data.category)
        })
      }
    }
  }
  

  , selectCategory:function(e){
    var _this = this;
    var selectId = e.currentTarget.dataset.id
    _this.setData({
      category: _this.parseCategory(selectId, app.globalData.categoryList)
    })
  }

  , parseCategory: function (selectId, categoryList){
    if (!categoryList) return categoryList;
    if (!selectId){
      categoryList[0].active = true
      this.loadDetail(categoryList[0].id)
      app.globalData.selectCategoryId = 0;
      return categoryList
    }
    for (var o in categoryList){
      if (categoryList[o].id == selectId){
        categoryList[o].active = true
        this.loadDetail(categoryList[o].id)
      }else{
        categoryList[o].active = false
      }
    }
    app.globalData.selectCategoryId = selectId;
    return categoryList
  }

  , loadDetail:function(parent_id){
    var _this = this;
    if (app.globalData.detailList[parent_id]){
      _this.setData({
        dataList: app.globalData.detailList[parent_id]
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.requsetSend({
      url: app.getRequsetUrl(app.getConfig('load_list_url')),
      data: { pid: parent_id },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        var data = res.data.data
        app.globalData.detailList[parent_id] = data
        _this.setData({
          dataList: app.globalData.detailList[parent_id]
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