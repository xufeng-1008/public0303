const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const {
  publicPath,
  babelConfig,
  externalConfig,
  devServer,
  globalConfig,
  chainWebpackPlugins,
} = require('./config');

function chainWebpackGloablConfig(config) {
  config.plugin('html').tap((args) => {
    args[0].templateParameters = {
      ...args[0].templateParameters,
      globalConfig,
    };
    return args;
  });
}

module.exports = {
  publicPath,
  devServer,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'],
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],

          }),
        ],
      },
    },
  },
  chainWebpack: (config) => {
    // const svgRule = config.module.rule('svg');
    // svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    externalConfig.chainWebpackExternals(config);
    chainWebpackPlugins(config);
    chainWebpackGloablConfig(config);
  },
  configureWebpack: {
    externals: externalConfig.externals,
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, '/node_modules/@qycloud'),
            path.join(__dirname, '/node_modules/element-ui'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: '/node_modules/@qycloud/lego-mobile/packages/style/iconfont/',
            },
          },
        },
        {
          test: /\.scss$/,
          sideEffects: true,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [path.resolve(__dirname, './src/styles/var.scss')],
              },
            },
          ],
        },
      ],
    },
  },
};
