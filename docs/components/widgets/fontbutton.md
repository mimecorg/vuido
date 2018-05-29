# FontButton

A button that opens a font selector dialog.

{% hint style="warning" %}
Currently it is not possible to select the font programmatically. The default selected font is platform specific.
{% endhint %}

## Properties

### font

type: libui.FontDescriptor

A read-only property of the FontButton element which returns information about the currently selected font. The returned object has the following methods:

* getFamily\(\) - return the font family
* getSize\(\) - return the font size
* getWeight\(\) - return the font weight
* getItalic\(\) - return the italic style
* getStretch\(\) - return the font stretch

{% hint style="info" %}
For more information, see the [libui-node documentation](https://github.com/parro-it/libui-node/blob/master/docs/attributedstring.md#fontdescriptor).
{% endhint %}

## Events

### change

Emitted when the selected font is changed. The current font descriptor is passed as an argument.

## Example

```markup
<FontButton v-on:change="onFontChange"/>
```

