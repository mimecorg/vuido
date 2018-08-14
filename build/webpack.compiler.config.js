const path = require( 'path' );
const webpack = require( 'webpack' );

const VuidoVersion = require( '../package' ).version;

module.exports = {
  mode: 'none',
  entry: './src/compiler/index.js',
  output: {
    path: path.resolve( __dirname, '../packages/vuido-template-compiler' ),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
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
  resolve: {
    alias: {
      'core': 'vue/src/core',
      'compiler': 'vue/src/compiler',
      'shared': 'vue/src/shared',
      'sfc': 'vue/src/sfc',
      'web': 'vue/src/platforms/web'
    }
  },
  externals: [ 'de-indent', 'he' ],
  plugins: [
    new webpack.DefinePlugin( {
      __WEEX__: false
    } ),
    new webpack.BannerPlugin( {
      banner: 'Vuido template compiler v' + VuidoVersion + ' | Copyright (C) 2018 Michał Męciński | License: MIT'
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
