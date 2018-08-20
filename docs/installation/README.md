# Installation

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

The easiest way to start using Vuido is to use Vue CLI to create a new project.

In order to use the `vue init` command, you can install the vue-cli package globally:

```bash
npm install --global vue-cli
```

If you prefer to use the new [Vue CLI 3](https://cli.vuejs.org/) instead, you have to install both @vue/cli and @vue/cli-init:

```bash
npm install --global @vue/cli @vue/cli-init
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

