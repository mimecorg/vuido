const path = require( 'path' );
const webpack = require( 'webpack' );
const babelConfig = require( '../.babelrc' );

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
        loader: 'babel-loader',
        options: babelConfig,
      }
    ]
  },
  externals: [ 'libui-node' ],
  plugins: [
    new webpack.BannerPlugin( {
      banner: 'libui-node-dom v' + VuidoVersion + '\nCopyright (C) 2018 Michał Męciński\nLicense: MIT'
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
