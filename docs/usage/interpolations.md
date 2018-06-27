# Interpolations

## Text Interpolation

You can use "mustaches" \(double curly braces\) inside the template for text interpolation. For example:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box>
      <Text>Hello, {{ name }}</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      name: 'John'
    };
  }
}
</script>
```

This will display "Hello, John" in the [Text](../components/widgets/text.md) widget. Thanks to reactivity built into Vue.js, the data is bound to the text of the widget, so when the value of the `name` property is changed, the text is automatically updated.

You can use simple JavaScript expressions inside the mustaches, for example `{{ number + 1 }}`.

The interpolation mechanism can also be used in other widgets which have static labels, for example [Button](../components/widgets/button.md) and [Checkbox](../components/widgets/checkbox.md).

## Binding Attributes

You can use the `v-bind` directive to bind dynamic values to attributes, for example:

```markup
<template>
  <Window v-bind:title="title" width="400" height="100" margined>
    <Box>
      <Text>Welcome to your Vuido application!</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello!'
    };
  }
}
</script>
```

The `v-bind` directive binds the data property, or the result of an expression, to the attribute specified after the colon. In this example, the title of the window will be "Hello!". When the value of the `title` property is changed, the title of the window is automatically updated.

The `v-bind` directive can be applied to many different attributes. In case of boolean attributes, the `null`, `undefined` and `false` values are interpreted as false and other values are interpreted as true.

{% hint style="info" %}
Currently, some attributes are static and cannot be modified dynamically. For example, it's not possible to change the Box layout between horizontal and vertical using the `v-bind` directive. This might change in the future versions of Vuido.
{% endhint %}

You can use simple JavaScript expressions in bound attributes, for example:

```markup
<Window v-bind:title="'Hello, ' + name">...</Window>
```

You can also use the shorthand syntax by omitting `v-bind` and prefixing the attribute name with a colon, for example:

```markup
<Window :title="title">...</Window>
```

See also [Interpolations](https://vuejs.org/v2/guide/syntax.html#Interpolations) in the Vue.js documentation for more details.

