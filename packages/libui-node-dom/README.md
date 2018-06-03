# libui-node-dom

DOM emulation layer for [libui-node](https://github.com/parro-it/libui-node).

This library wraps libui-node widgets into classes which emulate the DOM API. It is based on [Vuido](https://github.com/mimecorg/vuido) and can be used by other JavaScript frameworks which manipulate the DOM.

```js
import { TextNode, Comment, elements } from 'libui-node-dom'

function createElement( tagName ) {
  const element = elements[ tagName ];
  return new element( tagName );
}

function createTextNode( text ) {
  return new TextNode( text );
}

function createComment( text ) {
  return new Comment( text );
}
```

This package is auto-generated. Refer to the Vuido documentation for more information.
