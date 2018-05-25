import libui from 'libui-node'

import { Widget } from './widget'

export class Separator extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      vertical: false
    };
  }

  _createWidget() {
    if ( this.attributes.vertical )
      this.widget = new libui.UiVerticalSeparator();
    else
      this.widget = new libui.UiHorizontalSeparator();
  }

}
