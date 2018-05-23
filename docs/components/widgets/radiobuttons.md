# RadioButtons

A choice between multiple options.

## Attributes

### items

type: Array

Append a new radio option as last one with specified text from array.

### selected

type: Number

Set the current choosed option by index.

## Events

### on-selected

Emitted whenever property selected change.

## Example

```markup
// items: ['Option 1', 'Option 2', 'Option 3']
<RadioButtons :items="items" :selected="selected"  @on-selected="onRadioSelected"/>
```

