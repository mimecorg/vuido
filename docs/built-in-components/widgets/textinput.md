# TextInput

An input widget for editing a single line of text.

TextInput supports the `v-model` directive.

## Attributes

### readonly

type: Boolean

Whether the widget is read-only or editable.

### type

type: String

One of: `text`, `password` or `search`. The default type is `text`.

### value

type: String

The current text displayed in the widget.

## Events

### input

Called when the text is changed. The current text is passed as an argument.

## Example

```markup
<TextInput v-model="text"/>
```

