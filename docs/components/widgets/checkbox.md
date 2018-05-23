# Checkbox

A checkbox widget.

## Attributes

### text

type: String

The static text of the checkbox.

### checked

type: Boolean

Whether the checkbox is checked or unchecked. Read write. Defaults to false

## Events

### toggled

Emitted whenever property checked change.

## Example

```markup
<Checkbox text="Checkbox 1" :checked="true" @toggled="onChecked"/>
```

