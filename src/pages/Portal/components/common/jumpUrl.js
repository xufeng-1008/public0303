/* eslint-disable */
window.wx = require('weixin-js-sdk');

export default function (type, module, appId, id, config, appName, node, scId) {
  console.log({
    type, module, appId, id, config, appName, node, scId,
  });
  // const runtime = window.AY.get('runtime');
  const runtime = 'miniprogram';
  let url;
  if (type === 'view') {
    if (runtime === 'miniprogram') {
      url = id ? `/pages/view/index?spaceId=${config && config.entId}&module=${module}&appId=${appId}&labelId=${id}` : `/pages/view/index?spaceId=${config && config.entId}&module=${module}&appId=${appId}`;
      window.wx.miniProgram.navigateTo({
        url,
      });
    }
  } else if (type === 'detail') {
    if (runtime === 'miniprogram') {
      url = `/pages/detail/index?spaceId=${config && config.entId}&module=${module}&appId=${appId}&appName=${appName || '详情'}`;
      if (id) {
        url += `&formId=${id}`;
      }
      if (module === 'workflow') {
        if (node) {
          url += `&node=${node}`;
        }
      }
      if (scId) {
        url += `&scId=${scId}`;
      }
      console.log('url', url);
      window.wx.miniProgram.navigateTo({
        url,
      });
    } else {
      url = `/m/detail/${module}/${appId}/${id}`;
      window.location.assign(url);
    }
  }
}
