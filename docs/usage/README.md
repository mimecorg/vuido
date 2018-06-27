# Usage

When you create a basic Vuido application using vue-cli \(see [installation](../installation/)\), it contains two files in the source directory:

* main.js - the main script executed when the application is started
* MainWindow.vue - the main window component

## Main Script

The main script of the application looks like this:

{% code-tabs %}
{% code-tabs-item title="main.js" %}
```javascript
import libui from 'libui-node'
import Vue from 'vuido'

import MainWindow from './MainWindow'

const window = new Vue( {
  render: h => h( MainWindow )
} );

window.$mount();

libui.startLoop();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

In line 2 you can see that the Vuido module is imported as `Vue`. This is because Vuido can be used just like the standard Vue.js API.

The application starts by creating a root Vue instance in lines 6-8. Each root instance represents a single window of the application. The window is defined in a separate component, so the root instance only requires a render function which delegates the rendering to that component.

In standard Vue.js, the root instance is mounted on an existing DOM element. In Vuido, there is no need to pass the `el` option to the root instance. The window is created and displayed on the screen by calling `$mount()`, without any parameters.

The `libui.startLoop()` function imported from the libui-node module starts the main loop of the application, so the window remains visible and responds to user input.

## Window Component

The definition of the MainWindow component looks like this:

{% code-tabs %}
{% code-tabs-item title="MainWindow.vue" %}
```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="exit">
    <Box>
      <Text>Welcome to your Vuido application!</Text>
    </Box>
  </Window>
</template>

<script>
import libui from 'libui-node'

export default {
  methods: {
    exit() {
      libui.stopLoop();
    }
  }
}
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

If you are familiar with Vue.js, you will notice that this is a regular single-file component. It consists of a template, which defines the layout of the window and its properties, and a script which defines the behavior of the window.

In this simple example, the window contains only a single static line of text. When the window is closed by the user, the main loop is stopped and the application exits.

If you haven't used Vue.js before, don't worry. The syntax of the window template and the contents of the script section are explained in details in the following chapters of this documentation.

## Running the Application

You must build your application before running it:

```bash
npm run build
```

This command will create a new script in the `dist/` directory of your application. This script can be run directly using Node.js, or packaged for distribution using LaunchUI \(see [packaging](../packaging.md)\).

Use the following command to run the application:

```bash
npm start
```

