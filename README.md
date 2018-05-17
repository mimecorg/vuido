# Vuido

Create native desktop applications for Windows, OS X and Linux using [Vue.js](https://vuejs.org/).

[![NPM module](https://img.shields.io/npm/v/vuido.svg)](https://npmjs.org/package/vuido)
[![MIT License](https://img.shields.io/github/license/mimecorg/vuido.svg)](https://github.com/mimecorg/vuido/blob/master/LICENSE)

## Introduction

Vuido makes it possible to create native desktop applications using Vue.js. It supports single-file components. Applications using Vuido can be run natively using Node.js on Windows, OS X and Linux, without using Electron.

Vuido uses the [libui](https://github.com/andlabs/libui) library which provides native GUI components for each desktop platform, and the [libui-node](https://github.com/parro-it/libui-node) bindings for Node.js. It works with Vue.js libraries such as Vuex and it's compatible with standard Node.js packages.

At the moment Vuido is in a very early stage of development. The first goal is to implement all controls currently supported by libui and to write a documentation.

## Installation

To use Vuido in your application, install it using the following command:

```
npm install --save vuido
```

This also installs and compiles libui-node, so make sure you have installed its [prerequisites](https://github.com/parro-it/libui-node/blob/master/readme.md#prerequisites).

You can use Vuido just like Vue.js:

```
import libui from 'libui-node'
import Vue from 'vuido'

import MainWindow from './components/MainWindow'

const window = new Vue( {
  render( h ) {
    return h( MainWindow );
  }
} );

window.$mount();

libui.startLoop();
```

Calling `$mount()` on the window component will create and show the window. This method should be called without parameters.

## Single-file components

A single-file component for Vuido looks just like a regular Vue.js SFC, for example:

```
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

```
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

## Documentation

There is no documentation yet. You can find an example Vuido application in the `example/` directory.

## Acknowledgements

Vuido is largely based on Vue.js and shares most of its code, except for the platform specific code related to libui.

Vuido was inspired by [Proton Native](https://github.com/kusti8/proton-native), an environment for creating native desktop applications using React.

## License

Vuido is licensed under the MIT license

Copyright (C) 2018 Michał Męciński
