# pxtorem解决方案

## 工具介绍
### 1.PostCSS
postcss 一种对css编译的工具，类似babel对js的处理，常见的功能如：

1 . 使用下一代css语法
2 . 自动补全浏览器前缀
3 . 自动把px代为转换成rem（rem不熟悉的，点这）
4 . css 代码压缩等等
postcss 只是一个工具，本身不会对css一顿操作，它通过插件实现功能，autoprefixer 就是其一。


### 2.postcss-loader
1.这里只说在PostCSS在webpack里集成使用，首先需要 loader
```` javascript
npm install postcss-loader –save-dev
````
2 . webpack配置

一般与其他loader配合使用，下面*标部分才是postcss用到的
```
  {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
```
配合时注意loader的顺序（从下面开始加载）


### 3.postcss-pxtorem
postcss-pxtorem是一款 postcss 插件，用于将单位转化为 rem
### 4.amfe-flexible
一种移动端可伸缩布局方案
## 使用方法
>本方案使用换环境为:vue/cli3
1.首先在根目录文件中配置窗口禁止缩放:
``` html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```
2.安装postcss-pxtorem是一款 postcss 插件，用于将单位转化为 rem
```
npm i postcss-pxtorem --save-dev
```
3.新建vue.config.js (此文件在根目录下)
````
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],

          })
        ]
      }
    }
  }
};
````
````
//其他pxtorem的属性值
{
    rootValue: 16, //在HTML根目录节点下设置的font-size大小
    unitPrecision: 5, //转rem精确到小数点多少位
    propList: ['font', 'font-size', 'line-height', 'letter-spacing'], //指定转换rem的属性,支持*
    selectorBlackList: [], //str/reg 指定不转换的选择器,str时包含字段即匹配
    replace: true, //替换
    mediaQuery: false, //媒体查询内的px是否转换
    minPixelValue: 0 //小于指定数值的px不转换
}
````
>特殊技巧:不转换成rem
px检测区分大小写，也就是说Px/PX/pX不会被转换，可以用这个方式避免转换成rem
备注:
温馨提示： rootValue这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。假如设计图给的宽度是750，我们通常就会把rootValue设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。（iPhone界面尺寸：320 * 480、640 * 960、640 * 1136、750 * 1334、1080 * 1920等。）

那为什么你在这里写成了37.5呢？？？

之所以设为37.5，是为了引用像vant、mint-ui这样的第三方UI框架，因为第三方框架没有兼容rem，用的是px单位，将rootValue的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原vant、mint-ui的组件，否则会样式会有变化，例如按钮会变小。

既然设置成了37.5 那么我们必须在写样式时，也将值改为设计图的一半。

4.
(1)安装lib-flexible
```
npm i -S lib-flexible
```
(2)在入口文件main.js中引入
```
import 'lib-flexible/flexible';
```

## 参考地址
参考地址:https://www.jianshu.com/p/8f9aab666c4a
https://youzan.github.io/vant/?source=vuejsorg#/zh-CN/quickstart
https://www.npmjs.com/package/postcss-pxtorem
