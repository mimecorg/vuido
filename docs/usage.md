# Usage

Vuido is simply a port of Vue.js for the desktop and it can be used just like Vue.js. Vuido supports most of the standard Vue.js API, including methods, components and directives. It's also compatible with many Vue.js extensions, for example Vuex.

Applications using Vuido run in a Node.js environment, so they can use all standard Node.js modules, for example fs and http, and any packages compatible with Node.js.

## Creating a window component

The easiest way to create a window component using Vuido is to use a single-file component with .vue extension. The component should include a template, where you can use Vuido components instead of HTML. It should also include a script which defines the component logic.

Here's a basic window component using Vuido:

{% code-tabs %}
{% code-tabs-item title="MainWindow.vue" %}
```markup
<template>
  <Window title="Vuido Example" width="400" height="100" margined v-on:close="exit">
    <Box horizontal padded>
      <Text stretchy>Counter: {{ counter }}</Text>
      <Button v-on:click="increment">Increment</Button>
    </Box>
  </Window>
</template>

<script>
import libui from 'libui-node'

export default {
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    exit() {
      libui.stopLoop();
    }
  }
}
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## The main script of the application

A simple script with initializes the application looks as follows:

{% code-tabs %}
{% code-tabs-item title="main.js" %}
```javascript
import libui from 'libui-node'
import Vue from 'vuido'

import MainWindow from './components/MainWindow'

const window = new Vue({
  render: h => h(MainWindow)
});

window.$mount();

libui.startLoop();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

After creating the window component, call `$mount()` to show the window.

{% hint style="warning" %}
Note that `$mount()` should be called without any parameters. Also you should not pass the `el` option to the Vue instance.
{% endhint %}

Call `libui.startLoop()` to start the event loop of the application. To exit the application, call `libui.stopLoop()`. This is usually done in response to the close event of the window.

{% hint style="info" %}
Your application can create multiple windows by creating and mounting multiple root components. In order to close a window without exiting the application, call `$destroy()` on the root component.
{% endhint %}

## Compiling and running the application

You must build your application before running it:

```bash
npm run build
```

Use the following command to run the application:

```bash
npm start
```

