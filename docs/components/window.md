# Window

The root of the Vue.js application must be a Window component which represents a single window.

The window must contain exactly one child widget, typically a container.

## Attributes

### title

type: String

The title of the window.

### width

type: Number

The width of the window content.

### height

type: Number

The height of the window content.

### margined

type: Boolean

Whether the window adds a margin around its content.

### menu

type: Boolean

Whether the window has a menu.

### fullscreen

type: Boolean

Whether the window is displayed in full screen mode.

### borderless

type: Boolean

Whether the window is displayed without the border and title bar.

## Events

### close

Called when the close button is clicked. To exit the application, call `libui.stopLoop()`. To close the window without exiting the application, call `this.$root.$destroy()`.

### show

Called when the window is about to be shown. Unlike the `mounted()` life-cycle hook, at this point all widgets are already initialized.

### resize

Called when the size of the window is changed. The current size is passed as an argument. It's an object containing `w` and `h` properties representing the width and height.

## Properties

### window

type: libui.UiWindow

This property of the Window component returns the associated libui.UiWindow object. This makes it possible to pass the window as an argument of the libui.UiDialogs functions.

## Example

```markup
<Window title="Vuido Example" width="400" height="100" margined v-on:close="exit">
  <Box padded>
    ...
  </Box>
</Window>
```

