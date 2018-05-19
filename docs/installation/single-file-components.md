# Single-file components

A single-file component for Vuido looks just like a regular Vue.js SFC, for example:

```html
<template>
  <Window title="Vuido Example" width="400" height="100" margined v-on:close="exit">
    <Box horizontal padded>
      <Text stretchy>Counter: {{ counter }}</Text>
      <Button v-on:click="increment">Increment</Button>
    </Box>
  </Window>
</template>

<script>
...
</script>
```

You must bundle your application using [webpack](https://webpack.js.org/) in order to use single-file components. The simplest webpack configuration looks as follows:

```js
const path = require( 'path' );
const webpack = require( 'webpack' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const VuidoTemplateCompiler = require( 'vuido-template-compiler' );

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve( __dirname, '../dist' ),
    filename: 'bundle.js'
  }
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
```

You must use at least version 15.0 of [vue-loader](https://github.com/vuejs/vue-loader) in order to be able to inject the Vuido template compiler. Otherwise it will use the standard Vue.js template compiler which is not compatible with Vuido.

To ensure that the bundled script can be run correctly using Node.js, set the target to `'node'`. Also use the `ExternalsPlugin` to exclude libui-node and other native modules from the bundle.
