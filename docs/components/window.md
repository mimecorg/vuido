# Window

The root of the Vue.js application must be a Window component which represents a single window.

The window must contain exactly one child widget, typically a container.

## Attributes

### title

type: String

The title of the window.

### width

type: Number

The width of the window.

### height

type: Number

The height of the window

### margined

type: Boolean

Whether the window adds a margin around its content.

### menu

type: Boolean

Whether the window has a menu.

## Events

### close

Called when the close button is clicked. To exit the application, call `libui.stopLoop()`. To close the window without exiting the application, call `this.$root.$destroy()`.

### show

Called when the window is about to be shown. Unlike the `mounted()` life-cycle hook, at this point all widgets are already initialized.

## Example

```markup
<Window title="Vuido Example" width="400" height="100" margined v-on:close="exit">
  <Box padded>
    ...
  </Box>
</Window>
```

