const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');

const projectPath = process.cwd();

const APP_ID = process.env.APP_ID || 'mobile';


// 创建 server.js 文件
shell.cp(
  path.join(projectPath, 'config/server.example.js'),
  path.join(projectPath, 'config/server.js'),
);


// 修改 config/server.js 文件
const serverConfigPath = path.join(projectPath, 'config', 'server.js');
const serverConfig = fs.readFileSync(serverConfigPath, 'utf8');
fs.outputFileSync(serverConfigPath, serverConfig.replace("base: '/'", `base: '/bee/${APP_ID}'`));
