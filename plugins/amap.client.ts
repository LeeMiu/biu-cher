// 引入AMapLoader
import AMapLoader from '@amap/amap-jsapi-loader';

export default defineNuxtPlugin(async(nuxtApp) => {
  ;(window as any)._AMapSecurityConfig = {
    securityJsCode: 'a006dc4375fcf7d3e1631c4645f6f29c', // [您申请的安全密钥]
    serviceHost: "", // 「你配置的安全密钥代理地址」
    // 以上二选一即可
  }

  console.log('mounted.window', window._AMapSecurityConfig)
  return {
    provide: {
      _AMap: await AMapLoader.load({
        key: 'c863d743b1b7b0b6c012e7ff66f77c90', // 你申请的key
        version: '2.0',
        plugins: []
      })
    }
  }
})