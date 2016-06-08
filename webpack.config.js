var path = require('path');
// var webpack = require('webpack');
//
// var lodash = new webpack.ProvidePlugin({
//   _: '_',
//   'window._': '_'
// });

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    noParse: [
      path.resolve(__dirname, './node_modules/benchmark/benchmark.js'),
    ],
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|lib)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['lodash']
        }
      },
      // { test: path.resolve(__dirname, './node_modules/lodash/index.js'), loader: 'expose?_' }
    ]
  }
};
