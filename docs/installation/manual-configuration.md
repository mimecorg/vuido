# Manual configuration

This information is intended for advanced users who wish to configure a Vuido application manually. In most cases the automatic [quick setup](./#quick-setup) should be enough.

You need to install the [vuido](https://www.npmjs.com/package/vuido) package in order to use Vuido in you application:

```bash
npm install --save vuido
```

In order to use single-file components, you will also need [webpack](https://webpack.js.org/) and [vue-loader](https://vue-loader.vuejs.org/). The configuration is similar to a web application using Vue.js, with some important differences:

* The [vuido-template-compiler](https://www.npmjs.com/package/vuido-template-compiler) must be used instead of the standard vue-template-compiler which is used by vue-loader by default. Use the `compiler` option to pass the Vuido compiler to vue-loader. Note that this option requires vue-loader v15 or newer.
* Set the target option to 'node' to ensure that the compiled script can be run correctly by Node.js.
* Use webpack.ExternalsPlugin to exclude libui-node and other native modules from the bundle.

Example of webpack configuration using Vuido:

{% code-tabs %}
{% code-tabs-item title="webpack.config.js" %}
```javascript
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuidoTemplateCompiler = require('vuido-template-compiler');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
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
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs', ['libui-node']),
    new VueLoaderPlugin()
  ]
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You also need to install [babel-core](https://www.npmjs.com/package/babel-core), [babel-loader](https://github.com/babel/babel-loader) and [babel-preset-env](https://www.npmjs.com/package/babel-preset-env).

The basic Babel configuration which compiles the scripts for Node.js v8 looks like this:

{% code-tabs %}
{% code-tabs-item title=".babelrc" %}
```javascript
{
  "presets": [
    [ "env", {
      "targets": {
        "node": 8
      },
      "modules": false,
      "useBuiltIns": true
    } ]
  ],
  "comments": false
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

