# TextInput

An input widget for editing a single line of text.

TextInput supports the `v-model` directive.

## Attributes

### text

The current text displayed in the widget.

### readonly

Whether the widget is read-only or editable.

## Events

### input

Called when the text is changed. The current text is passed as an argument.

## Example

```markup
<TextInput v-model="text"/>
```

