# Usage

You can use Vuido just like Vue.js:

```js
import libui from 'libui-node'
import Vue from 'vuido'

import MainWindow from './components/MainWindow'

const window = new Vue( {
  render( h ) {
    return h( MainWindow );
  }
} );

window.$mount();

libui.startLoop();
```

Calling `$mount()` on the window component will create and show the window. This method should be called without parameters.
