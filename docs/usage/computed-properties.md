# Computed Properties

You can use computed properties to calculate values based on data properties:

```markup
<template>
  <Window title="Example" width="400" height="100" margined>
    <Box>
      <Text>Hello, {{ fullName }}</Text>
    </Box>
  </Window>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Smith'
    };
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  }
}
</script>
```

This creates a `fullName` property which will be automatically calculated based on the `firstName` and `lastName` properties. The example will display "Hello, John Smith" in the [Text](../components/widgets/text.md) widget.

The above code can be also written like this:

```markup
<Text>Hello, {{ firstName + ' ' + lastName }}</Text>
```

However, when the expression becomes complex, or is repeated within the template, putting it into a computed property results in simpler and more readable code. Also, the computed property is defined using a regular function, so it can contain more complex code, not just a simple expression.

You can use a computed property just like a regular data property, for example:

```javascript
methods: {
  printName() {
    console.log( this.fullName );
  }
}
```

Thanks to Vue.js reactivity, the value of the computed property will only be recalculated when necessary, in this case when the `firstName` or `lastName` is changed. Because of that, computed properties are more efficient than regular methods.

A computed property can also have a setter:

```javascript
computed: {
  fullName: {
    get() {
      return this.firstName + ' ' + this.lastName;
    },
    set( newValue ) {
      const names = newValue.split( ' ' );
      this.firstName = names[ 0 ];
      this.lastName = names[ names.length - 1 ];
    }
  }
}
```

This way, the base properties are automatically modified when the you assign a value directly to the computed property.

In some cases it's necessary to plug directly into the Vue.js reactivity system, for example to initiate an asynchronous operation when a data property changes. You can declare a watcher to do that:

```javascript
watch: {
  page( oldValue, newValue ) {
    // this function is called when the value of the page property is changed
  }
}
```

See also [Computed Properties and Watchers](https://vuejs.org/v2/guide/computed.html) in the Vue.js documentation for more details.

