# Managing Windows

## Starting the Application

To start the application, you should create a root Vue component representing a window and call `$start()`. This will display the window and start the main loop of the application:

```javascript
const window = new Vue( {
  render: h => h( MainWindow )
} );

window.$start();
```

## Exiting the Application

To exit the application, call the `$exit()` method. This will stop the main loop of the application. Typically, this is done in response to the close event:

```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="exit">
    ...
  </Window>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$exit();
    }
  }
}
</script>
```

Note that `$exit()` automatically closes all open windows and destroys all root Vue components associated with them.

## Creating Additional Windows

Your application can consist of multiple windows. To create and display another window, create a separate root Vue component and call `$mount()` without any parameters:

```javascript
const logWindow = new Vue( {
  render: h => h( LogWindow )
} );

logWindow.$mount();
```

Note that the `$start()` method automatically calls `$mount()` if it hasn't been called. However, if you need to display more than one window, you should use `$mount()` to display them.

## Destroying a Window

To close a window without exiting the application, call `$destroy()` on the root Vue component corresponding to that window:

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

The root component can be accessed using the `$root` property which is part of the Vue.js API.

Note that the application will keep running in the background, even if you destroy all windows. To exit the application, call the `$exit()` method instead.

