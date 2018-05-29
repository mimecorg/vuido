# ColorButton

A button that opens a color selector dialog.

ColorButton supports the `v-model` directive.

## Attributes

### value

type: { r: Number, g: Number, b: Number, a: Number }

The currently selected color. The value is an object containing four numeric properties which represent the red, green, blue and alpha components in the range from 0 to 1.

## Events

### change

Emitted when the selected color is changed. The current color is passed as an argument.

## Example

```markup
<ColorButton v-model="color"/>
```

