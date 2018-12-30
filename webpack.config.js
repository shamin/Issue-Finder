const path = require("path");

module.exports = {
  entry: {
    options: "./src/options/index.js",
    popup: "./src/popup/index.js",
    main: "./src/background/index.js",
  },
  output: {
    path: path.resolve(__dirname, "extension"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        type: "javascript/auto",
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    contentBase: "./extension",
    historyApiFallback: true
  }
};
