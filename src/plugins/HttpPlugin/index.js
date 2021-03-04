import { $http } from '@commonbox/utils';

export default class HttpPlugin {
  static install(Vue) {
    Vue.prototype.$http = $http;
  }
}
