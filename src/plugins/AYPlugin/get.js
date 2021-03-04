import { cloneDeep } from 'lodash';

function splitProperty(property) {
  return property.split('.');
}

export default (property) => {
  const config = cloneDeep(window.globalConfig || {});
  if (!property) {
    return config;
  }
  const properties = splitProperty(property);
  const selectedConfig = properties.reduce((prev, next) => {
    try {
      return prev[next];
    } catch (err) {
      return null;
    }
  }, config);
  return selectedConfig;
};
