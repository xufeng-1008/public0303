const moduleConfig = {
  root: '/',
};
const modules = {};
const modulesLoadingStatus = {};
const modulesLoadedStatus = {};
const moduleHandlers = {};
const headElement = document.getElementsByTagName('head')[0];

const pathIsAbsolute = (path) => {
  const splitDeviceRe = /^([a-zA-Z]+:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?([\s\S]*?)$/;
  const result = splitDeviceRe.exec(path);
  const device = result[1] || '';
  const isUnc = Boolean(device && device.charAt(1) !== ':');

  return Boolean(result[2] || isUnc);
};

const autocompleteModuleId = (moduleId) => {
  if (/^\w+\/?$/.test(moduleId)) {
    moduleId += '/index';
  }
  return moduleId.replace(/\/+/g, '/');
};

const createLinkNode = () => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  return link;
};

const createScriptNode = (notAsync) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  if (!notAsync) {
    script.async = true;
  }
  return script;
};

const register = (moduleId, module) => {
  if (!modules[moduleId]) {
    modules[moduleId] = module;
  }
};

const normalizeModulePath = (moduleId, absolute) => {
  if (absolute) {
    return moduleId;
  }

  if (window.Assets[moduleId]) {
    return window.Assets[moduleId].js;
  }

  let modulePath = `${moduleConfig.root || ''}/${autocompleteModuleId(moduleId)}`;

  if (!/\.js$/.test(moduleId)) {
    modulePath += '.js';
  }

  return modulePath.replace(/\/\//, '/');
};


const load = (moduleId, absolute) => {
  const isCss = /\.css$/.test(moduleId);
  let node;
  if (isCss) {
    node = createLinkNode();
  } else {
    node = createScriptNode(absolute);
  }
  const removeListeners = () => {
    node.removeEventListener('load', onload, false);
    node.removeEventListener('error', onerror, false);
  };

  const onload = () => {
    removeListeners();
    modulesLoadedStatus[moduleId] = true;
    const handlers = moduleHandlers[moduleId];
    const module = modules[moduleId];

    if (handlers) {
      let handler;

      while ((handler = handlers.pop())) {
        handler.resolve(module);
      }
    }

    if (absolute) {
      register(moduleId, {
        loaded: true,
      });
    }
  };

  const onerror = () => {
    removeListeners();
    modulesLoadedStatus[moduleId] = true;
    const handlers = moduleHandlers[moduleId];

    if (handlers) {
      let handler;

      while ((handler = handlers.pop())) {
        handler.reject(`${moduleId} doesn't exist`);
      }
    }
  };

  node.addEventListener('load', onload, false);
  node.addEventListener('error', onerror, false);

  if (isCss) {
    node.href = normalizeModulePath(moduleId, absolute);
  } else {
    node.src = normalizeModulePath(moduleId, absolute);
  }
  headElement.appendChild(node);
};

export default (moduleId, absolute) => {
  absolute = absolute || pathIsAbsolute(moduleId);

  if (!absolute) {
    moduleId = autocompleteModuleId(moduleId);
  }
  return new Promise((resolve, reject) => {
    if (modules[moduleId]) {
      resolve(modules[moduleId]);
    } else if (!modulesLoadedStatus[moduleId]) {
      moduleHandlers[moduleId] = moduleHandlers[moduleId] || [];
      moduleHandlers[moduleId].push({
        resolve,
        reject,
      });
      if (!modulesLoadingStatus[moduleId]) {
        modulesLoadingStatus[moduleId] = true;
        load(moduleId, absolute);
      }
    } else {
      reject();
    }
  });
};
