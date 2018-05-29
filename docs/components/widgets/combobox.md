# Combobox

An input widget for editing text with a drop-down list.

Combobox supports the `v-model` directive.

## Attributes

### items

type: Array

An array of strings representing the available options.

### value

type: String

The current text displayed in the widget.

## Events

### input

Called when the text is changed. The current text is passed as an argument.

## Example

```markup
<Combobox v-bind:items="[ 'Option 1', 'Option 2', 'Option 3' ]" v-model="text"/>
```

