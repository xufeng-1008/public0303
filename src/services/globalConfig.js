import { $http } from '@commonbox/utils';

const { server: { www } } = require('../../config/server');

const setUser = async () => {
  if (!window.globalConfig.user) {
    const { data: { result } } = await $http.get('/api2/user/info');
    window.globalConfig.user = result;
  }
};

const setFileMaxSize = async () => {
  if (!window.globalConfig.maxFileSize) {
    const { data: { maxFileSize } } = await $http.get('/api/store/getUMFSize');
    window.globalConfig.maxFileSize = maxFileSize;
  }
};
const formatUrl = combineServer => Object.keys(combineServer).reduce((result, key) => {
  if (
    key === 'root' || key === 'ws' || key === 'websocketProtocol' || key === 'websocket'
  ) {
    result[key] = combineServer[key];
  } else {
    const url = combineServer[key].replace(/\/$/, '');
    result[key] = `${url}`;
  }
  return result;
}, {});

export const getGlobalServer = async () => {
  const serverConfig = await $http.get('/napi/global/server');
  console.log(serverConfig, 'serverConfig');
  const combineServer = Object.assign({}, serverConfig.data, { www });
  window.globalConfig.server = formatUrl(combineServer);
  return window.globalConfig.server;
};
export const patchGlobalConfig = async (token) => {
  try {
    if (token) {
      $http.interceptors.request.use((config) => {
        config.headers.Authorization = `Basic ${token}`;
        return config;
      });
    }
    await setUser();
    await setFileMaxSize();
    return 200;
  } catch (e) {
    return e.response.status;
  }
};
