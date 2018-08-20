# Using libui Classes

In most cases you don't have to use the libui library directly, because Vuido provides its own API and components to interface with that library.

However, there are situations where you have to directly use some classes from the libui library. You can import it in the following way:

```javascript
import libui from 'libui-node'

const path = new libui.UiDrawPath( libui.fillMode.winding );
```

Alternatively, you can use the `$libui` property available in all Vuido components:

```javascript
const path = new this.$libui.UiDrawPath( this.$libui.fillMode.winding );
```

{% hint style="info" %}
For more information, see the [libui-node documentation](https://github.com/parro-it/libui-node/tree/master/docs).
{% endhint %}

