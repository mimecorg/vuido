# Installation

## Prerequisites

The following prerequisites are needed to compile [libui-node](https://github.com/parro-it/libui-node), which is used by Vuido.

### Windows

* [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) or Visual Studio 2015
* [Visual C++ Redistributable Package for Visual Studio 2013](https://www.microsoft.com/en-us/download/details.aspx?id=40784)

### Linux

If they are not provided by default in your distribution:

* [build-essential](https://packages.ubuntu.com/xenial/build-essential)
* [GTK+ 3](https://packages.ubuntu.com/source/xenial/gtk+3.0)

### OS X

* Xcode

## Quick setup

The easiest way to start using Vuido is to use [vue-cli](https://www.npmjs.com/package/vue-cli) to create the scaffolding of the project.

First make sure that vue-cli is installed globally:

```bash
npm install -g vue-cli
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



