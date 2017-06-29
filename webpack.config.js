const webpack = require('webpack');

module.exports = {
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }]
  },
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    process: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
