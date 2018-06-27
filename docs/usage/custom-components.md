# Custom Components

## Child Components

In simple applications, the window consists of just one component. However, when the window becomes complex, it may be a good idea to split it into a few separate child components. For example:

```markup
<template>
  <Window title="Example" width="640" height="480" margined>
    <Box padded>
      <WindowHeader/>
      <WindowFooter/>
    </Box>
  </Window>
</template>

<script>
import WindowHeader from './WindowHeader'
import WindowFooter from './WindowFooter'

export default {
  components: {
    WindowHeader,
    WindowFooter
  }
}
</script>
```

This creates a window component which contains two child components, one under another.

The child components must be imported and declared using the `components` option of the parent component. Custom components declared like this can be used just like built-in components.

The root element of a child component can be a container, or even a single widget. For example:

```markup
<template>
  <Box padded>
    <Button>OK</Button>
    <Button>Cancel</Button>
  </Box>
</template>
```

## Component Registration

Some components are used in many different places in the application, for example in different windows. Instead of importing them into every parent component that needs to use them, you can declare a global component.

This can be done by calling `Vue.component()` in the main script of the application:

{% code-tabs %}
{% code-tabs-item title="main.js" %}
```javascript
import libui from 'libui-node'
import Vue from 'vuido'

import ButtonGroup from './ButtonGroup'
import MainWindow from './MainWindow'

Vue.component( 'ButtonGroup', ButtonGroup );

const window = new Vue( {
  render: h => h( MainWindow )
} );

window.$mount();

libui.startLoop();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now you can place the custom ButtonGroup component inside any other component.

See also [Component Registration](https://vuejs.org/v2/guide/components-registration.html) in the Vue.js documentation for more information.

## Properties

You can use properties to pass data from the parent component to the child component. For example, let's define a custom component like this:

{% code-tabs %}
{% code-tabs-item title="ButtonGroup.vue" %}
```markup
<template>
  <Box padded>
    <Button>{{ okText }}</Button>
    <Button>{{ cancelText }}</Button>
  </Box>
</template>

<script>
export default {
  props: {
    okText: String,
    cancelText: String
  }
}
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The `props` section specifies that this component has two properties, `okText` and `cancelText`, and their values must be strings. You can use other JavaScript types, like `Boolean`, `Numeric`, `Array` or `Object` to validate the property.

Now you can use the ButtonGroup component like this:

```markup
<ButtonGroup ok-text="OK" cancel-text="Cancel"/>
```

Note that the kebab-cased names of attributes are mapped to the corresponding camelCased names of properties.

A property can have a default value:

```javascript
props: {
  okText: { type: String, default: 'OK' },
  cancelText: { type: String, default: 'Cancel' }
}
```

It also can be marked as required:

```javascript
props: {
  items: { type: Array, required: true }
}
```

You can pass a dynamic value to a property using `v-bind`:

```markup
<ButtonGroup v-bind:ok-text="okText" v-bind:cancel-text="cancelText"/>
```

When using a boolean or numeric property, you must use the `v-bind` directive even if you pass a constant value. Otherwise the value would be interpreted as a string. For example:

```markup
<BlogPost v-bind:likes="42" v-bind:is-published="true"/>
```

You can also omit the value to pass `true` to a boolean property:

```markup
<BlogPost is-published/>
```

See also [Props](https://vuejs.org/v2/guide/components-props.html) in the Vue.js documentation for more information.

## Custom Events

Child components can use custom events to notify their parent:

{% code-tabs %}
{% code-tabs-item title="ButtonGroup.vue" %}
```markup
<template>
  <Box padded>
    <Button v-on:click="okClick">OK</Button>
    <Button v-on:click="cancelClick">Cancel</Button>
  </Box>
</template>

<script>
export default {
  methods: {
    okClick() {
      this.$emit( 'ok-click' );
    },
    cancelClick() {
      this.$emit( 'cancel-click' );
    }
  }
}
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The parent component can listen to these events using the `v-on` directive:

```markup
<ButtonGroup v-on:ok-click="accept" v-on:cancel-click="reject"/>
```

You can also use events to pass data to the parent component:

{% code-tabs %}
{% code-tabs-item title="NameInput.vue" %}
```markup
<template>
  <Box>
    <Text>Enter your name:</Text>
    <TextInput v-bind:value="value" v-on:input="emitInput"/>
  <Box>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    emitInput( newValue ) {
      this.$emit( 'input', newValue );
    }
  }
}
</script>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The parent component can use the following code to update the value of its data property:

```markup
<NameInput v-bind:value="name" v-on:input="name = $event"/>
```

Note that the child component cannot simply modify the `value` property, because that will not automatically update the data in the parent component.

The `v-model` directive can also be used with custom components. By default, it binds the `value` property and the `input` event to the specified property of the parent component, so the above code is equivalent to:

```markup
<NameInput v-model="name"/>
```

When your window contains a complex hierarchy of custom components, passing data around using properties and events may become difficult to manage. In such case consider using a state management library, such as [Vuex](https://vuex.vuejs.org/).

See also [Custom Events](https://vuejs.org/v2/guide/components-custom-events.html) in the Vue.js documentation for more information.

## Slots

You can use slots to pass contents from the parent component to a child component. For example, let's assume that we have this simple child component:

{% code-tabs %}
{% code-tabs-item title="NavigationButton.vue" %}
```markup
<template>
  <Button v-on:click="navigate">
    <slot></slot>
  <Button>
<template>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

We can use it like this:

```markup
<NavigationButton>About</NavigationButton>
```

The "About" text is inserted in place of the `<slot>` element. The slot contents can include not just text, but also other elements, including built-in components and custom components.

See also [Slots](https://vuejs.org/v2/guide/components-slots.html) in the Vue.js documentation for more information.

## Dynamic Components

The special `<component>` element can be used to dynamically switch between components. For example, you can replace the entire contents of a window without having to close it and create a new window:

```markup
<template>
  <Window title="Example" width="640" height="480" margined>
    <component v-bind:is="currentComponent"/>
  </Window>
</template>
```

The `currentComponent` property can contain either the name of a registered component, or the options object which defines a component.

See also [Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components) in the Vue.js documentation for more information.

