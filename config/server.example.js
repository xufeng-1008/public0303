/**
 * 以下配置中，如涉及 url，相关配置均不需携带协议头（http 或 https），比如：
 * 错误：https://www.qycloud.com.cn
 * 正确：www.qycloud.com.cn
 */
module.exports = {
  https: true, // todo 根据环境修改协议
  userAgent: 'mini', // todo app:原生app  web:普通网页  mini:微信小程序
  dev: {
    host: 'dev.qycloud.com.cn', // todo 本地代理域名
    port: 8080, // 本地代理端口
    /**
     * 代理配置格式：{ path: String, target: String }
     * target 默认值为配置项 server.wwww 的值
     */
    proxies: [], // todo 只需配置项目自己所需代理
  },
  server: {
    www: 'www.qycloud.com.cn', // todo 项目平台地址
  },
  router: {
    base: '/', // todo 署应用包时的基本 URL
  },
};
