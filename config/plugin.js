const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

exports.chainWebpackPlugins = (config) => {
  const { NODE_ENV, ENABLE_WEBPACK_ANALYZER } = process.env;
  if (
    NODE_ENV === 'production'
    && parseInt(ENABLE_WEBPACK_ANALYZER, 10) === 1
  ) {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  }
  config.plugin('moment-locales-webpack-plugin').use(
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
  );
};
