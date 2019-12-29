'use strict';
var webpack = require('webpack');
module.exports = {
	mode: 'development',
	entry: '', // gulpファイルで上書きされる
	output: {},// gulpファイルで上書きされる
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
      extensions:['.ts', '.js']
  },
  plugins: []
};