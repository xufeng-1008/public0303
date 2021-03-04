# 安装

```shell
$ git clone git@git.qycloud.com.cn:Mage/Zero.git
$ cd ~/Zero
$ nrm use qycloud
$ npm login
$ yarn install
```

# 配置

## 本地开发

```shell
$ cd ~/Zero/config
$ cp server.example.js server.js
$ vim server.js # 根据实际情况修改具体配置
$ sudo vim /etc/hosts # 在文件末尾添加类似配置：127.0.0.1 dev.qycloud.com.cn
```

# 命令

```shell
$ cd ~/Zero

# 本地开发
$ yarn serve

# 编译打包
$ yarn build
```

# 其他

* git commit 格式检查：https://github.com/conventional-changelog/commitlint


# 镜像打包
docker build -t miniprogram:v1.1 .
docker tag  miniprogram:v1.1  hub.qycloud.com.cn/open/miniprogram:v1.1
docker push hub.qycloud.com.cn/open/miniprogram:v1.1
