# RadioButtons

 A widget that represent a group of radio buttons.

The RadioButtons widget supports the `v-model` directive.

## Attributes

### items

type: Array

An array of strings representing the available options. The array must contain at least one element.

### selected

type: Number

The index of the currently selected radio button.

## Events

### change

Emitted when the selected radio button is changed. The current index is passed as an argument.

## Example

```markup
<RadioButtons v-bind:items="[ 'Option 1', 'Option 2', 'Option 3' ]"
              v-model="selected"/>
```

