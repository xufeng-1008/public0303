import Vue from 'vue';
import LegoMobile from '@qycloud/lego-mobile';
import '@qycloud/lego-mobile/lib/index.scss';
import '@qycloud/lego-mobile/lib/style/iconfont/qy/iconfont.css';
import { jsBridgeReady } from '@qycloud/js-bridge';
import AYPlugin from './plugins/AYPlugin';
import HttpPlugin from './plugins/HttpPlugin';
import router from './router';
import 'lib-flexible/flexible';
import './styles/index.scss';
import './styles/form.scss';
import '@babel/polyfill';
import { getGlobalServer } from './services';

window.ZERO_VERSION = require('../package.json');


Vue.use(AYPlugin);
Vue.use(HttpPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render() {
    return (
      <div>
        {this.isShowQR ? <qr-code on-close-pop={this.handleCloseQR} /> : null}
        <keep-alive include="homePage">
          <router-view />
        </keep-alive>
      </div>
    );
  },
  data() {
    return {
      isShowQR: false,
    };
  },
  created() {
    this.beforeRender();
  },
  methods: {
    handleCloseQR() {
      this.isShowQR = false;
    },
    beforeRender() {
      const { https, server, userAgent } = require('../config/server');
      if (userAgent !== 'mini') {
        jsBridgeReady((bridge) => {
          bridge.callHandler('isShowTitleBar', { isShowTitleBar: false }, () => { });
        });
      }
      if (server.www && server.fileio && server.root && server.storeView) {
        Vue.use(LegoMobile, { https, server, userAgent });
        return;
      }
      getGlobalServer().then((res) => {
        const servers = Object.assign({}, res);
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const k in servers) {
          servers[k] = servers[k].replace(/^((http|https|ftp):\/\/)/ig, '');
        }
        console.log('servers', servers);
        Vue.use(LegoMobile, { https, server: servers, userAgent });
      });
    },
  },
  mounted() {
    window.cheet('↑ ↑ ↓ ↓ ← → ← →', () => {
      this.isShowQR = true;
      console.log('显示二维码');
    });
  },
}).$mount('#app');
