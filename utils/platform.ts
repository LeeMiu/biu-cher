const u = navigator ? navigator.userAgent.toLowerCase() : '';

export default {
  ie: u.indexOf('trident') > -1, // IE内核
  opera: u.indexOf('presto') > -1, // opera内核
  webKit: u.indexOf('appleWebKit') > -1, // 苹果、谷歌内核
  gecko: u.indexOf('gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
  mobile: !!u.match(/appleWebKit.*Mobile.*/) || !!u.match(/applewebkit/), // 是否为移动终端
  ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
  android: u.indexOf('android') > -1 || u.indexOf('linux') > -1, // android终端或者uc浏览器
  iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1, // 是否为iPhone或者QQHD浏览器
  iPad: u.indexOf('ipad') > -1, // 是否iPad
  webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
  wx: u.indexOf('micromessenger') > -1, // 微信
  weibo: u.match(/WeiBo/i), // 微博客户端
  isQQ: u.match(/\sQQ/i),
  isIphoneX: u.indexOf('isiphonex/1') !== -1,
  'android-shoulei': false, // 是否再安卓手雷里
};
