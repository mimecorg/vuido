<p align="center">
  <img src="https://raw.githubusercontent.com/mimecorg/vuido/master/docs/.gitbook/assets/vuido-logo-200.png" alt style="max-width:100%;">
</p>

<h1 align="center">Vuido</h1>

<p align="center">Create native desktop applications for Windows, OS X and Linux using <a href="https://vuejs.org/">Vue.js</a>.</p>

<p align="center">
  <a href="https://npmjs.org/package/vuido"><img src="https://img.shields.io/npm/v/vuido.svg" alt="NPM module"></a>
  <a href="https://github.com/mimecorg/vuido/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mimecorg/vuido.svg" alt="MIT License"></a>
</p>

## Introduction

Vuido is a framework for creating native desktop applications based on Vue.js. Application using Vuido can run on Windows, OS X and Linux, using native GUI components, and don't require Electron.

Under the hood, Vuido uses the [libui](https://github.com/andlabs/libui) library which provides native GUI components for each desktop platform, and the [libui-node](https://github.com/parro-it/libui-node) bindings for Node.js.

<p align="center">
  <img src="https://raw.githubusercontent.com/mimecorg/vuido/master/docs/.gitbook/assets/vuido-demo.png" alt style="max-width:100%;">
</p>

## Prerequisites

The following prerequisites are needed to compile [libui-node](https://github.com/parro-it/libui-node), which is used by Vuido.

### Windows

* [windows-build-tools](https://www.npmjs.com/package/windows-build-tools)
* [Visual C++ Redistributable Package for Visual Studio 2013](https://www.microsoft.com/en-us/download/details.aspx?id=40784)

```bash
npm install --global --production windows-build-tools
```

### Linux

If they are not provided by default in your distribution:

* [build-essential](https://packages.ubuntu.com/xenial/build-essential)
* [GTK+ 3](https://packages.ubuntu.com/source/xenial/gtk+3.0)

#### Ubuntu / Debian

```bash
sudo apt install build-essential libgtk-3-dev
```

### OS X

* Xcode

```bash
xcode-select --install
```

## Quick Setup

The easiest way to start using Vuido is to use [vue-cli](https://www.npmjs.com/package/vue-cli) to create the scaffolding of the project.

First make sure that vue-cli is installed globally:

```bash
npm install --global vue-cli
```

Run the following command to create the project \(replace `my-project` with the name of your project\):

```bash
vue init mimecorg/vuido-webpack-template my-project
```

Enter the directory created by vue-cli and install all dependencies:

```bash
cd my-project
npm install
```

Now you can build and run your application:

```bash
npm run build
npm start
```

## Packaging

Although native desktop applications can run in the standard Node.js environment, it is recommended to use [LaunchUI](https://github.com/mimecorg/launchui) to package and distribute them to end users.

The easiest way to create a package for your application is to use the [LaunchUI Packager](https://github.com/mimecorg/launchui-packager). It provides an API for creating packages for Windows, Linux and OS X.

## Documentation

You can find the full documentation of Vuido at [vuido.mimec.org](https://vuido.mimec.org/).

## Development Status

Currently Vuido implements the basic containers and widgets and it's ready to be used for creating simple applications. More advanced features are under active development.

Bug reports and feature requests are welcome, however please look for a related issue in the [libui](https://github.com/andlabs/libui) project first, because Vuido can only implement functionality which is already implemented in libui.

## Acknowledgements

Vuido is largely based on Vue.js and shares most of its code, except for the platform specific code related to libui.

Vuido was inspired by [Proton Native](https://github.com/kusti8/proton-native), an environment for creating native desktop applications using React.

## License

Vuido is licensed under the MIT license

Copyright (C) 2018 Michał Męciński
