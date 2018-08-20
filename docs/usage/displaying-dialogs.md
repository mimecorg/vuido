# Displaying Dialogs

## Message Boxes

You can use the `$dialogs.msgBox()` method to display a simple message box with an OK button. The first parameter is the title of the dialog and the second parameter is the message text. For example:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Button v-on:click="showMessage">Show Message</Button>
  </Window>
</template>

<script>
export default {
  methods: {
    showMessage() {
      this.$dialogs.msgBox( 'Title', 'This is the message.' );
    }
  }
}
</script>
```

You can also use the `$dialogs.msgBoxError()` method to display an error message. It has the same parameters as `msgBox()`.

## File Dialogs

You can use the `$dialogs.openFile()` method to allow the user to select an existing file or `$dialogs.saveFile()` to prompt for a new file to be created or overwritten. Both these methods return the path of the selected file or null if the user cancelled the operation. For example:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Button v-on:click="openFile">Open File</Button>
  </Window>
</template>

<script>
export default {
  methods: {
    openFile() {
      const filePath = this.$dialogs.openFile();
      if ( filePath != null ) {
        // do something...
      }
    }
  }
}
</script>
```

