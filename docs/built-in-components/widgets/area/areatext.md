# AreaText

A paragraph of text with formatting.

## Attributes

### x

type: Number

The horizontal position of the text.

### y

type: Number

The vertical position of the text.

### layout

type: [libui.DrawTextLayout](https://github.com/parro-it/libui-node/blob/master/docs/attributedstring.md#drawtextlayout)

The content and layout of the text paragraph.

## Example

```markup
<template>
  <Area>
    <AreaText x="100" y="100" v-bind:layout="textLayout"/>
  </Area>
</template>

<script>
import libui from 'libui-node'

export default {
  computed: {
    textLayout() {
      const str = new libui.AttributedString( 'Hello, world!' );
      const font = new libui.FontDescriptor( 'Arial', 10, libui.textWeight.normal,
        libui.textItalic.normal, libui.textStretch.normal );
      return new libui.DrawTextLayout( str, font, 200, libui.textAlign.left );
    }
  }
}
</script>
```

