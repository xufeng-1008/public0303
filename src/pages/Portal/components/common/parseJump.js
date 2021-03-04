/* eslint-disable */
import qs from 'qs';
import jumpUrl from './jumpUrl.js';

function getAppId(url) {
  let appId = '';
  if (url.lastIndexOf('?') !== -1) {
    appId = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
  } else {
    appId = url.substring(url.lastIndexOf('/') + 1);
  }
  return appId;
}
const handleLink = (tab) => {
  const curLinkInfo = {};
  const strList = tab.value.split('/');
  for (const str of strList) {
    if (!!str && str.indexOf('space-') !== -1) {
      curLinkInfo.entId = str.split('space-')[1];
    }
  }
  if (tab.value && tab.value.indexOf('/form?') !== -1) {
    if (tab.value.substring(tab.value.lastIndexOf('?')) !== -1) {
      const spliceData = tab.value.substring(tab.value.lastIndexOf('?') + 1);
      const parseDada = qs.parse(spliceData);
      jumpUrl('detail', parseDada.module, parseDada.app, parseDada.form, curLinkInfo);
    }
    return;
  }
  jumpProy(tab, curLinkInfo, true);
};

const getLabelId = (url) => {
  const index = url.lastIndexOf('=');
  const string = url.substring(index + 1);
  return index > -1 ? string : '';
};
function noSupport(msg) {
  window.MINT
    && window.MINT.Toast({
      message: msg || '此功能暂不支持',
      duration: 1500,
    });
}

const accessTypeProxy = {
  app: {
    jump(tab) {
      if (tab.accessShowType === 'add') {
        jumpAdd(tab);
        return;
      }
      jumpToThreeClient(tab);
    },
  },
  url: {
    // 应用类型:url :/link/!/[url]
    jump(tab) {
      jumpToThreeClient(tab);
    },
  },
};
function jumpToThreeClient(tab) {
  if (!(tab.value.indexOf('/app/!') !== -1 || tab.value.indexOf('space-') !== -1)) {
    noSupport();
    return;
  }
  // 如果地址是符合约定格式的url链接:/m/[spaceId]/app/!/[module]/[appId]
  if (tab.value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/)) {
    handleLink(tab);
    return;
  }
  jumpProy(tab);
}
function jumpProy(tab, config, isHandleLink) {
  let lableId = null;
  let appType = '';
  const appId = getAppId(tab.value);
  if (tab.value && tab.value.indexOf('/app/!/information') !== -1) {
    appType = 'information';
  } else if (tab.value && tab.value.indexOf('/app/!/workflow') !== -1) {
    appType = 'workflow';
    lableId = getLabelId(tab.value);
  } else {
    if (isHandleLink) {
      // 防止特殊链接进入死循环,
      noSupport();
      return;
    }
    handleLink(tab);
    return;
  }
  if (!config) {
    jumpUrl('view', appType, appId, lableId, tab);
  } else {
    jumpUrl('view', appType, appId, lableId, config);
  }
}
function jumpAdd(tab) {
  if (!tab.value) {
    noSupport('链接配置错误！');
    return;
  }
  const currentUrl = tab.value.split('record/');
  if (currentUrl.length < 1) {
    noSupport('链接配置错误！');
    return;
  }
  let appKey = '';
  if (currentUrl[1].indexOf('/') !== -1) {
    appKey = currentUrl[1].substring(0, currentUrl[1].indexOf('/'));
  } else {
    appKey = currentUrl[1];
  }
  let appType = '';
  let lableId = '';
  if (tab.value && tab.value.indexOf('/app/!/information') !== -1) {
    appType = 'information';
  } else if (tab.value && tab.value.indexOf('/app/!/workflow') !== -1) {
    appType = 'workflow';
    lableId = getLabelId(tab.value);
  }

  jumpUrl('detail', appType, appKey, lableId, tab);
  //    console.log({ type, module, appId, id, config, appName, node, scId });
}
const parseJump = (tab) => {
  // 从快捷入口跳转
  console.log('parseJump>>>', tab);
  if (!accessTypeProxy[tab.accessType]) {
    noSupport();
    return;
  }
  accessTypeProxy[tab.accessType].jump(tab);
};
export { parseJump };
