# Slider

Horizontal slider for editing numeric values.

Slider supports the `v-model` directive.

## Attributes

### min

type: Number

The minimum value of the slider.

### max

type: Number

The maximum value of the slider.

### value

type: Number

The current value of the slider.

## Events

### change

Emitted when the current value is changed. The current value is passed as an argument.

## Example

```markup
<Slider min="0" max="100" v-model="slider"/>
```

