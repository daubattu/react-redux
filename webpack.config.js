var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/server',
    filename: 'bundle.js',
    publicPath: '/public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader', 'babel-loader'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'server/shared')
      ]
    }]
  }
};
