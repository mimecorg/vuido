# Window Template

The template section of the window component describes the layout of the window:

```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="exit">
    <Box>
      <Text>Welcome to your Vuido application!</Text>
    </Box>
  </Window>
</template>
```

The template uses a syntax similar to HTML, but using built-in Vuido components and custom components instead of HTML elements.

The root element of the window template is the [Window](../built-in-components/window.md) component. It contains some attributes, such as the `title` of the window, its `width` and `height`. The `margined` attribute indicates that the window has a margin around its contents. It's a boolean attribute, so it doesn't need to have a value.

The `v-on` directive is described in the [Handling User Input](handling-user-input.md) chapter. In this example, when the user attempts to close the window, the `exit()` method of the component is called.

The child element of the Window is a [Box](../built-in-components/containers/box.md) container. Since a Window can only contain a single child, it's recommended to use a container to make it possible to add multiple widgets.

Box is the simplest container which aligns its children vertically or horizontally. If you add another Text component to the box, you can see that it's displayed below the first line of text. You can add the `padded` attribute to the box container to add a space between its children. If you add the `horizontal` attribute, the box layout will change from vertical to horizontal.

The [Text](../built-in-components/widgets/text.md) component is the simplest widget which displays static text. Vuido contains many different [built-in widgets](../built-in-components/widgets/) for handling user input and displaying information.

Note that you cannot use styles or CSS classes to change the look of components. Vuido uses the native GUI components of the operating system, so unlike HTML elements, they cannot be styled.

You can nest multiple containers to create more complex layouts. For example, let's add two buttons below the the static text:

```markup
<template>
  <Window title="Example" width="400" height="100" margined v-on:close="exit">
    <Box padded>
      <Text>Welcome to your Vuido application!</Text>
      <Box horizontal padded>
        <Button>OK</Button>
        <Button>Cancel</Button>
      </Box>
    </Box>
  </Window>
</template>
```

The outer box aligns it children vertically, so the static text is displayed above the buttons. The inner box has the `horizontal` attribute, so the two buttons are displayed next to each other.

By default, each widget in a Box container is displayed using its minimum size. You can add the `strechy` attribute to a child widget to tell the Box container to increase the width \(in a horizontal layout\) or height \(in a vertical layout\) to fill the available space.

If multiple child widgets have the `stretchy` attribute, the available space is divided equally between them. For example, if you add this attribute to both buttons, each of them will expand to half of the window's width. When you resize the window, the buttons will be resized as well.

The [Form](../built-in-components/containers/form.md) container is useful if you have a form layout with multiple input fields stacked vertically and captions next to them.

The [Group](../built-in-components/containers/group.md) container adds a border and caption around its content. It can only contain a single child element, so in most cases you should put a box container inside the group.

Finally, the [Tab](../built-in-components/containers/tab.md) container can be used to group its child elements into separate tabs.



