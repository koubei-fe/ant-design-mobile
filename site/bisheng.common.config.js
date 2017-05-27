const path = require('path');
const configSvg = require('../svg.config');

module.exports = {
  webpackConfig(config) {
    configSvg(config, true);
    config.externals = {
      history: 'History',
      'babel-polyfill': 'this', // hack babel-polyfill has no exports
    };
    config.module.noParse = [/moment.js/];

    config.resolve.alias = {
      'antd-mobile/lib': path.join(process.cwd(), 'components'),
      'antd-mobile': process.cwd(),
      site: path.join(process.cwd(), 'site'),
      // in case you want to develop with local rc-component
      // 'rc-tabs': '/Users/jiangkai/github/tabs',
      preact: 'kb-preact',
      react: 'kb-preact-compat',
      'react-dom': 'kb-preact-compat',
      'preact-compat': 'kb-preact-compat',
      'create-react-class': 'kb-preact-compat/lib/create-react-class',
    };

    config.babel.plugins.push([
      'babel-plugin-transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ], [
      require.resolve('babel-plugin-import'),
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'components',
      },
    ]);
    return config;
  },
};
