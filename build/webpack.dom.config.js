const path = require( 'path' );
const webpack = require( 'webpack' );

const VuidoVersion = require( '../package' ).version;

module.exports = {
  mode: 'none',
  entry: './src/runtime/dom.js',
  output: {
    path: path.resolve( __dirname, '../packages/libui-node-dom' ),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [ 'libui-node' ],
  plugins: [
    new webpack.BannerPlugin( {
      banner: 'libui-node-dom v' + VuidoVersion + ' | Copyright (C) 2018 Michał Męciński | License: MIT'
    } )
  ],
  performance: {
    hints: false
  },
  stats: {
    children: false,
    modules: false
  },
  devtool: false
};
