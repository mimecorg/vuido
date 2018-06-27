# Managing Windows

## Creating a Window

To create and display a window, you should create a root Vue component and call `$mount()` without any parameters:

```javascript
const window = new Vue( {
  render: h => h( MainWindow )
} );

window.$mount();
```

Your application can consist of multiple windows. You can create and mount multiple instances of the same window component, or create separate components for different windows.

## Destroying a Window

To close a window without exiting the application, call `$destroy()` on the root Vue component corresponding to that window. Typically, this is done in response to the close event:

```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="close">
    ...
  </Window>
</template>

<script>
export default {
  methods: {
    close() {
      this.$root.$destroy();
    }
  }
}
</script>
```

Note that the root component is accessed using the `$root` property which is part of the Vue.js API.

## Closing the Application

To exit the application and close all remaining windows, call `libui.stopLoop()`. This will abort the main loop of the application.

In the following example, the application exits when the user closes the main window:

```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="exit">
    ...
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

