//app.js
const config = require("./config.js");
var threeSessionId;
App({
  onLaunch: function (option) {
    //获取入口信息
    var _this = this;
    _this.globalData.scene = option.scene;
    //本地存储threeSessionId
    threeSessionId = wx.getStorageSync('threeSessionId');
    wx.checkSession({
      success: function () {
        if (!threeSessionId) {
          _this.login();
        }
      },
      fail: function () {
        _this.login();
      }
    })
    _this.globalData.trSession = threeSessionId;
    _this.loadInit();
  }

  , log:function(log){
      console.log(log)
  }

  //获取配置信息
  , getConfig: function (key) {
    return config[key];
  }
  //获取请求链接
  , getRequsetUrl: function (action_mothed) {
    return config.host + action_mothed
  }
  //用户登录
  , login: function (obj) {
    var _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: _this.getRequsetUrl(config.login_url),
            data: {
              code: res.code,
              scene_id: _this.globalData.scene
            },
            method: 'GET',
            success: function (ret) {
              if (ret.data.code == 0) {
                _this.globalData.trSession = ret.data.data.threeSessionId;
                wx.setStorageSync('threeSessionId', ret.data.data.threeSessionId);
                if (_this.userInfoReadyCallback) {
                  _this.userInfoReadyCallback(_this.globalData.userInfo)
                }
                if (obj) {
                  _this.requsetSend(obj);
                }
              } else {
                _this.log('获取用户登录态失败！' + ret.data.error)
              }
            }
          })
        } else {
          _this.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }); //重新登录
  }
  //网络请求
  , requsetSend: function (obj) {
    var _this = this;
    obj.data.threeSessionId = _this.globalData.trSession;
    obj.data.scene_id = _this.globalData.scene;
    wx.request({
      url: obj.url,
      data: obj.data,
      method: obj.method,
      header: {
        "Content-Type": config.request_header
      },
      success: function (ret) {
        if (ret.data.code == 100) {
          _this.login(obj);
        } else {
          obj.success(ret);
        }
      },
      fail: function (ret) {
        if (typeof obj.fail == 'function') {
          obj.fail(ret);
        }
      },
      complete: function (e) {
        if (typeof obj.complete == 'function') {
          obj.complete(ret);
        }
      }
    })
  }
  //页面跳转
  , handGo: function (source_path) {
    let pages = getCurrentPages()
    for (var o in pages) {
      if (source_path == pages[o].route) {
        wx.navigateBack({
          delta: (pages.length - 1) - o
        })
        return true;
      }
    }
    wx.navigateTo({
      url: '/' + source_path
    })
  }
  
  //分享信息
  , initShareData: function (res) {
    return {
      title: res ? res.title : config.default_share_title,
      path: res ? res.path : config.default_share_path,
      imageUrl: res ? res.image : config.default_share_image
    }
  }

  , loadInit(){
    var _this = this;
   // wx.showLoading({
      //title: '加载中...',
    //})
    _this.requsetSend({
      url: _this.getRequsetUrl(config.load_init_url),
      data: {t:1},
      method: 'POST',
      success: function (res) {
        //wx.hideLoading();
        res = res.data
        _this.bannerList = res.data.banner
        _this.summaryList = res.data.summary
        _this.categoryList = res.data.category
        //console.log('run:loadInit')
        if(_this.onReadyInitCallback){
          //console.log('run:onReadyInitCallback')
          _this.onReadyInitCallback(res)
        }
      }
    });
  }

  ,globalData: {
      userInfo: null
    , scene:0
    , trSession:null
    , imageServerPath: config.static_server
    , bannerList:null
    , summaryList:null
    , categoryList:null
    , selectCategoryId:0
    , detailList:[]
    , productRow:[]
  }
})