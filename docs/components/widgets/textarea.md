# TextArea

An input widget for editing multiple lines of text.

TextArea supports the `v-model` directive.

{% hint style="info" %}
TextArea uses the `\n` character as the line separator, regardless of the platform on which the application runs.
{% endhint %}

## Attributes

### readonly

type: Boolean

Whether the widget is read-only or editable.

### value

type: String

The current text displayed in the widget.

## Events

### input

Called when the text is changed. The current text is passed as an argument.

## Example

```markup
<TextArea v-model="text"/>
```

