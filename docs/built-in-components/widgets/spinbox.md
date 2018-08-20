# Spinbox

An input widget for editing numeric values.

Spinbox supports the `v-model` directive.

## Attributes

### min

type: Number

The minimum value of the spin box.

### max

type: Number

The maximum value of the spin box.

### value

type: Number

The current value of the spin box.

## Events

### change

Emitted when the current value is changed. The current value is passed as an argument.

## Example

```markup
<Spinbox min="0" max="100" v-model="spinbox"/>
```

