module.exports = {
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }]
  },
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  }
};
