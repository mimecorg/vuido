# Handling User Input

## Event Handling

You can use the `v-on` directive to attach event listeners:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box padded>
      <Text>Counter: {{ counter }}</Text>
      <Button v-on:click="increment">Increment</Button>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment() {
      this.counter++;
    }
  }
}
</script>
```

When the user clicks the button, the `increment()` method is called.

The value of the `v-on` directive can be either the name of a method or an expression, so the above example could also be written as:

```markup
<Button v-on:click="counter++">Increment</Button>
```

Events emitted when the value of an input widgets is changed have an argument which specifies the new value. For example:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box>
      <TextInput v-on:input="print"/>
    </Box>
  </Window>
</template>

<script>
export default {
  methods: {
    print( value ) {
      console.log( 'The new value is: ' + value );
    }
  }
}
</script>
```

You can also use the shorthand syntax by omitting `v-on` and prefixing the attribute name with a `@`, for example:

```markup
<Button @click="increment">...</Button>
```

See also [Event Handling](https://vuejs.org/v2/guide/events.html) in the Vue.js documentation for more details.

## Input Binding

You can use the `v-model` directive to create a two-way binding between a data property and an input widget:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box padded>
      <TextInput v-model="text"/>
      <Text>{{ text }}</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      text: 'Edit me'
    };
  }
}
</script>
```

When the user edits the text in the [TextInput](../built-in-components/widgets/textinput.md) widget, the value of the `text` property is automatically updated. When the `text` property in changed by code, the input widget is also updated.

The `v-model` directive is actually just a shorthand syntax for an attribute binding and event handling. The example could also be written as:

```markup
<TextInput v-bind:value="text" v-on:input="text = $event"/>
```

The `v-model` directive can be used with many different input widgets, including [TextInput](../built-in-components/widgets/textinput.md), [TextArea](../built-in-components/widgets/textarea.md), [Combobox](../built-in-components/widgets/combobox.md), [ColorButton](../built-in-components/widgets/colorbutton.md), [Slider](../built-in-components/widgets/slider.md), [Spinbox](../built-in-components/widgets/spinbox.md), [Checkbox](../built-in-components/widgets/checkbox.md), [RadioButtons](../built-in-components/widgets/radiobuttons.md) and [DropdownList](../built-in-components/widgets/dropdownlist.md). In case of a Checkbox, the value of the property is either `true` or `false`. In case of RadioButtons and DropdownList, the value is the index of the selected radio button or item.

The `v-model` directive can also be used with [custom components](custom-components.md#custom-events).

See also [Form Input Bindings](https://vuejs.org/v2/guide/forms.html) in the Vue.js documentation for more details.

