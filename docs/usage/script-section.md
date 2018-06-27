# Script Section

The script section of the window component describes the behavior of the window. The object exported by the script contains options which are passed to the Vue instance when the window is created. For example:

```markup
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
    },
    decrement() {
      this.counter--;
    }
  }
}
</script>
```

The `data()` function returns an object which describes the initial state of the window. Its properties become the properties of the Vue instance. All data properties are reactive, which means that the user interface is automatically updated when the values of these properties are changed.

The `methods` option defines functions which become the methods of the Vue instance. These methods can access and change data properties and call other methods of that instance using the `this` keyword. You can use methods to react to user input and implement the logic of the application.

You can also create special functions, called the lifecycle hooks, which are called when the instance is created, destroyed and updated. For example, you can run some code after an instance is created:

```markup
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  created() {
    this.text = 'Hello';
  }
}
</script>
```

See also [Instance Lifecycle Hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) in the Vue.js documentation for more details.

Other options which can be used in the script section are described in the following chapters of this documentation.

