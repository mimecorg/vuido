# Conditionals and Loops

## Conditional Rendering

To render a widget or container only under certain conditions, you can use the `v-if` directive:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box padded>
      <Text>Welcome to your Vuido application!</Text>
      <Text v-if="seen">You can see this</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      seen: true
    };
  }
}
</script>
```

In this example, both Text widgets are displayed because the condition evaluates to true. When the value of the `seen` property is changed to false, the second Text widget is removed from the window.

You can use `v-else-if` and `v-else` directives to create conditions with multiple alternatives:

```markup
<Button v-if="mode == 'button'">This is a button</Button>
<Checkbox v-else-if="mode == 'checkbox'">This is a checkbox</Checkbox>
<Text v-else>This is something else</Text>
```

Note that conditional directives destroy and create the widgets whenever the condition changes. To temporarily hide a widget without destroying it, you can use the [visible](common-attributes.md#visible) attribute.

See also [Conditional Rendering](https://vuejs.org/v2/guide/conditional.html) in the Vue.js documentation for more details.

## List Rendering

To render multiple instances of the same component, you can use the `v-for` directive:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box padded>
      <Text v-for="item in items">- {{ item }}</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      items: [ 'apples', 'oranges', 'bananas' ]
    };
  }
}
</script>
```

In this example, three Text widgets are rendered, one for each element of the `items` array. When an item is added or removed from this array, corresponding Text widgets are automatically added or removed.

It's recommended to provide a unique `key` attribute for each item. This way, the state of widgets will be preserved when array items are reordered.

See also [List Rendering](https://vuejs.org/v2/guide/list.html) in the Vue.js documentation for more details.

