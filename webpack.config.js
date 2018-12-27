const path = require('path');

module.exports = {
  entry: {
    'options': './src/options/options.js',
    'popup': './src/popup/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './extension',
    historyApiFallback: true
  }
};
