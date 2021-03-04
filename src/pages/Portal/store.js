/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import { $http } from '@commonbox/utils';
import { Parser } from '@formbox/field-utils';

export function parseData(type, item, tableId, fieldId, schema) {
  let result;
  if (type === 'workflow') {
    if (tableId === 'workflow') {
      result = Parser.parseRecordValue('workflow', item, tableId, fieldId, {});
    } else {
      result = Parser.parseRecordValue('workflow', item, tableId, fieldId, (schema[tableId] && schema[tableId][fieldId]) || {});
    }
  } else {
    result = Parser.parseRecordValue('information', item, tableId, fieldId, (schema[tableId] && schema[tableId][fieldId]) || {});
  }
  return result;
}

export function getInformationList(configParams, params) {
  const {
    type, titleId, titleTable: tableId, contentId, contentTable, spaceId, schema,
  } = configParams;
  return $http.get(`/space-${spaceId}/api2/view/data/information/label`, { params })
    .then((res2) => {
      const list = [];
      if (res2.status !== 200) {
        return new Promise((resolve, reject) => {
          reject(res2);
        });
      }
      if (res2.data.result && Array.isArray(res2.data.result.data)) {
        res2.data.result.data.forEach((item) => {
          list.push({
            id: item.id,
            data: [
              parseData(type, item, tableId, titleId, schema),
              parseData(type, item, contentTable, contentId, schema),
            ],
          });
        });
      }
      return new Promise((resolve) => {
        resolve(list);
      });
    });
}
export function getListData(_this) {
  const { appConfig, config } = _this;
  console.log('appConfig', appConfig, 'config', config);
  const params = {
    'params[paging][perPage]': 3,
    'params[paging][start]': 0,
    'params[labelId]': _this.appTabId,
    'params[appId]': config.app_id,
  };
  const configParams = {
    type: config.app_type,
    titleId: config.titleId,
    titleTable: config.titleTable,
    contentId: config.contentId,
    contentTable: config.contentTable,
    spaceId: config.entId,
    schema: appConfig.schema,
  };
  if (config.app_type === 'information') {
    params['params[tableId]'] = appConfig.table && appConfig.table.master && appConfig.table.master.tables && appConfig.table.master.tables[0].table_id;
    return getInformationList(configParams, params);
  }
  return getWorkflowList(configParams, params);
}
export function getWorkflowList(configParams, params) {
  const {
    type, titleId, titleTable: tableId, contentId, contentTable, spaceId, schema,
  } = configParams;
  return $http.get(`/space-${spaceId}/api2/workflow/instance`, { params })
    // eslint-disable-next-line consistent-return
    .then((res) => {
      const list = [];
      if (res.status === 200 && res.data.status === 200 && res.data.result && Array.isArray(res.data.result.jobs)) {
        res.data.result.jobs.forEach((item) => {
          list.push({
            id: item.id,
            data: [
              parseData(type, item, tableId, titleId, schema),
              parseData(type, item, contentTable, contentId, schema),
            ],
          });
        });
        console.log('getWorkflowList', list);
        return new Promise((resolve) => {
          resolve(list);
        });
      }
    });
}
export function getListViewData(_this) {
  // todo 为什么列表1,2都是获取列表接口不一样?
  const { appConfig, config: module } = _this;
  const params = {
    'module': 'workflow',
    'type': 'label',
    'params': {
      'paging': { 'perPage': 3, 'start': 0 },
      'appId': module.app_id,
      'tableId': (appConfig.table && appConfig.table.master && appConfig.table.master.tables && appConfig.table.master.tables[0].table_id) || '',
      'labelId': _this.appTabId,
    },
  };
  if (_this.config.app_type === 'information') {
    params.module = 'information';
  }
  return $http.get('/napi/mobile/view/data', { params })
    .then((res) => {
      console.log('getListViewData', res);
      return new Promise((resolve) => {
        resolve(res.data.data.list);
      });
    });
/*
//底层原生
  // return $http.post(`/space-${module.entId}/api2/view/data/information/label`, params)
  //   .then(res => new Promise((resolve) => {
  //     resolve(res.data.result.data);
  //   }));
  // const params = {
//   'type': 'list',
//   'perPage': '15',
//   'startPage': '0',
//   'appId': module.app_id,
//   'labelId': _this.appTabId,
// };
// return $http.get(`/space-${module.entId}/api2/view/data/workflow`, { params })
//   .then(res => new Promise((resolve) => {
//     resolve(res.data.result.jobs);
//   }));
// } */
}

export function getTodoList(_this) {
  const { config: module } = _this;
  const params = {
    action: 'multiple',
    componentId: module.componentId,
    page: _this.pages || 1,
    limit: _this.limit || 3,
  };
  return $http
    .get('/api2/portal/component/todo', { params });
}


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

const AVAILABLE_COMPONENTS = {
  access: 'Access',
  appContent: 'AppContent',
};
// 1、state：创建初始化状态
const state = {
  // 放置初始状态
  spaceId: '',
  portalId: '',
  componentTypeList: [],
  entryClassificationList: [],
  securityToken: '',
};

// 2、mutations：创建改变状态的方法
const mutations = {
  // 状态变更函数-一般大写
  updateEntryClassificationList(state, list) {
    state.entryClassificationList = list;
  },
  upadateComponentTypeList(state, list) {
    state.componentTypeList = list;
  },
  updatePortalId(state, portalId) {
    state.portalId = portalId;
  },
  updateSpaceId(state, spaceId) {
    state.spaceId = spaceId;
  },
};

// 3、getters：提供外部获取state
const getters = {
  count(state) {
    return state.count;
  },
};

// 4、actions：创建驱动方法改变mutations
const actions = {
  // workflow和dataflow
  // 触发mutations中相应的方法-一般小写
  getPortalId({ commit }, _this) {
    console.log('_this.$route.query', _this.$route.query);
    const { id, token } = _this.$route.query;
    if (token) {
      state.securityToken = token;
    }
    if (id && id !== 'empty') {
      return new Promise((resolve) => {
        commit('updatePortalId', id);
        resolve(id);
      });
    }
    const params = {
      type: 'miniprogram',
      page: 1,
      limit: 1,
    };
    // 要在同域名下才能使用,本地lego_mobile无法调试
    const AgentHeaders = {
      headers: {
        authorization: token ? `Basic ${token}` : '',
      },
    };
    return $http
      .get(`/space-${_this.spaceId}/api2/portal/category`, {
        ...AgentHeaders,
        params,
      })
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        console.log(res);
        // eslint-disable-next-line no-underscore-dangle
        if (res.data.result && res.data.result.data && res.data.result.data[0] && res.data.result.data[0]._id) {
          // eslint-disable-next-line no-underscore-dangle
          commit('updatePortalId', res.data.result.data[0]._id);
        }
        // eslint-disable-next-line consistent-return,no-underscore-dangle
        return res.data.result.data[0]._id;
      });
  },
  getData({ commit }, _this) {
    // todo 链接时可能没有cookie 用securityToken作为参数
    return $http.post('/api2/portal/navigation', { portalId: state.portalId }).then((rsp) => {
      const res = rsp.data;
      console.log(res);
      if (res.status === 200 && res.result && Array.isArray(res.result.componentList)) {
        const entryClassificationList = [];
        const componentTypeList = new Set();
        for (const item of res.result.componentList) {
          if (item.type in AVAILABLE_COMPONENTS) {
            delete item.layout;
            item.type = AVAILABLE_COMPONENTS[item.type];
            // todo  快捷入口图片类型地址可能需要处理
            /* if (state.securityToken && item.type === 'Access') {
              for (const sub of item.dataSource) {
                let img = sub.img || sub.lunboImg;
                let host = this.ctx.hostname;
                if (img) {
                  if (img.indexOf('fileio-') > 0) {
                    try {
                      host = img.split('fileio-')[1].split('/')[0];
                      img = img.replace('fileio-', '');
                    } catch (e) {
                      console.log(e);
                    }
                  } else if (img.indexOf('fileio.') > 0) {
                    try {
                      img = img.replace('fileio.', 'www.');
                      host = img.split('://')[1].split('/')[0];
                    } catch (e) {
                      console.log(e);
                    }
                  } else {
                    continue;
                  }

                  img = `/file?src=${encodeURIComponent(img)}&host=${host}&token=${securityToken}`;

                  if (sub.img) {
                    sub.img = img;
                  } else if (sub.lunboImg) {
                    sub.lunboImg = img;
                  }
                }
              }
            } */
            entryClassificationList.push(item);
            componentTypeList.add(item.type);
          }
        }
        commit('upadateComponentTypeList', componentTypeList);
        commit('updateEntryClassificationList', entryClassificationList);
      //  return res;
      }
    });
  },
  getConfig({ commit }, _this) {
    return $http
      .get(`/space-${state.spaceId}/api2/uiengine/config/${_this.config.app_type}/${_this.config.app_id}/mobile?use=view`);
  },

  getList2Data({ commit }, _this, id) {
    const configParams = {
      appId: _this.config.app_id,
      type: _this.config.app_type,
      perPage: 3,
      start: 0,
      labelId: id,
      titleId: _this.config.titleId,
      titleTable: _this.config.titleTable,
      contentId: _this.config.contentId,
      contentTable: _this.config.contentTable,
    };
    const {
      type, appId, perPage, start, labelId, titleTable: tableId, titleId, contentTable, contentId,
    } = configParams;
    return $http.get(`/space-${state.spaceId}/api2/uiengine/config/${configParams.type}/${configParams.appId}/mobile?use=view`)
      .then((rsp) => {
        if (rsp.data.status !== 200) {
          return;
        }
        const res = rsp.data;
        const params = {
          'paging[perPage]': perPage,
          'paging[start]': start,
          'params[labelId]': labelId,
          'params[appId]': appId,
        };
        const { schema } = res.result;
        if (_this.config.app_type === 'information') {
          params['params[tableId]'] = res.result.table && res.result.table.master && res.result.table.master.tables && res.result.table.master.tables[0].table_id;
          return $http.get(`/space-${state.spaceId}/api2/view/data/information/label`, { params })
            .then((res2) => {
              const list = [];
              if (res2.status !== 200) {
                return new Promise((resolve, reject) => {
                  reject(res2);
                });
              }
              if (res2.data.result && Array.isArray(res2.data.result.data)) {
                res2.data.result.data.forEach((item) => {
                  list.push({
                    id: item.id,
                    data: [
                      parseData(type, item, tableId, titleId, schema),
                      parseData(type, item, contentTable, contentId, schema),
                    ],
                  });
                });
              }
              console.log(list);
              return new Promise((resolve) => {
                resolve(list);
              });
            });
        }
      });
  },
};

// 5、全部注入Store中
const store = new Vuex.Store({
  plugins: debug ? [logger()] : [],
  state,
  mutations,
  getters,
  actions,
});

// 6、输出store
export default store;
