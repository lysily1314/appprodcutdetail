/**
 * 小程序配置文件
 */
var config = {
  //接口主机
  host: 'https://xcx.socialjia.com/projects/index.php?'
  //用户登录接口
  , login_url:'c=Verena&m=login'
  
  , load_init_url:'c=Verena&m=loadParentCategory'

  , load_list_url: 'c=Verena&m=loadCategoryProduct'

  , load_detail_url: 'c=Verena&m=loadProductDetail'

  //头部请求信息
  , request_header:'application/x-www-form-urlencoded'
  //默认分享标题
  , default_share_title:''
  //默认分享路径
  , default_share_path:'/pages/index/index'
  //默认分享图片
  , default_share_image:''
  //静态资源url目录
  //, static_server: 'http://pic.weibopie.com/wxapp/gz/miniApp/handbook/server/'

  , static_server: '/serverImages/'
 
};

module.exports = config;
