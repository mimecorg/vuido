const path = require( 'path' );
const webpack = require( 'webpack' );
const babelConfig = require( '../.babelrc' );

const VuidoVersion = require( '../package' ).version;
const VueVersion = require( 'vue/package' ).version;

module.exports = {
  mode: 'none',
  entry: './src/runtime/index.js',
  output: {
    path: path.resolve( __dirname, '../dist' ),
    filename: 'vuido.js',
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
  resolve: {
    alias: {
      'core': 'vue/src/core',
      'shared': 'vue/src/shared',
      'web': 'vue/src/platforms/web',
      'weex': 'vue/src/platforms/weex'
    }
  },
  externals: [ 'libui-node' ],
  plugins: [
    new webpack.DefinePlugin( {
      __WEEX__: false,
      __VUE_VERSION__: "'" + VueVersion + "'"
    } ),
    new webpack.BannerPlugin( {
      banner: 'Vuido v' + VuidoVersion + '\nCopyright (C) 2018 Michał Męciński\nLicense: MIT'
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
