# DropdownList

A widget for selecting a value from a drop-down list.

DropdownList supports the `v-model` directive.

## Attributes

### items

type: Array

An array of strings representing the available options.

### selected

type: Number

The index of the currently selected option.

## Events

### change

Emitted when the selected option is changed. The current index is passed as an argument.

## Example

```markup
<DropdownList v-bind:items="[ 'Option 1', 'Option 2', 'Option 3' ]"
              v-model="selected"/>
```

