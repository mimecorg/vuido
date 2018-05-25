# ColorButton

A button that opens a color palette popup.

## Attributes

### color

type: String

Set currently selected color (ex. #fefefe)

## Events

### changed

Emitted whenever property color change.

## Example

```markup
<ColorButton @changed="onColorChanged" :color="color"/>
```
