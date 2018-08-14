const path = require( 'path' );
const webpack = require( 'webpack' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );

const VuidoTemplateCompiler = require( '../../packages/vuido-template-compiler' );

module.exports =  {
  mode: 'development',
  entry: './example/main.js',
  output: {
    path: path.resolve( __dirname, '../dist' ),
    filename: 'main.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compiler: VuidoTemplateCompiler
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json' ]
  },
  plugins: [
    new webpack.ExternalsPlugin( 'commonjs', [ 'libui-node', { 'vuido': '../../dist/vuido.js' } ] ),
    new VueLoaderPlugin()
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
