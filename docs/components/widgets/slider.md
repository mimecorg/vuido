# Slider

Horizontal slide to set numerical values.

## Attributes

### value

type: Number

The current numeric value of the slider. Read write.

## Events

### changed

Emitted whenever property value change.

## Example

```markup
<Slider min="0" max="100" :value="slider" @changed="onSliderChange"/>
```

