# Production Builds

You can use a single webpack configuration file to create both development and production builds.

The production builds are optimized and minified. They don't contain code which is only used for debugging. You can use the script built in production mode when [packaging your application](../packaging.md).

Example of webpack configuration for building a Vuido application in both development and production modes:

```javascript
const path = require( 'path' );
const webpack = require( 'webpack' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const VuidoTemplateCompiler = require( 'vuido-template-compiler' );

module.exports = function( { production } = {} ) {
  if ( production )
    process.env.NODE_ENV = 'production';

  const config = {
    mode: production ? 'production' : 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve( __dirname, '../dist' ),
      filename: production ? 'main.min.js' : 'main.js'
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
      new webpack.ExternalsPlugin( 'commonjs', [ 'libui-node' ] ),
      new VueLoaderPlugin()
    ]
  };

  return config;
}

```

By default, webpack will create a development bundle, dist/main.js.

In order to enable the production mode, pass the `production` environment flag, for example:

```bash
webpack --config build/webpack.config.js --env.production
```

This will create a dist/main.min.js bundle optimized for production.

Note that you must use webpack 4 to be able to minify a Vuido application. Vuido uses some ES6 features which are not supported by the version of UglifyJS used by webpack 3. Alternatively, you can use a different minifier which is compatible with ES6.

