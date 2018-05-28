import libui from 'libui-node'

import { Widget } from './widget'

export class Separator extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      horizontal: false
    };
  }

  _createWidget() {
    if ( this.attributes.horizontal )
      this.widget = new libui.UiHorizontalSeparator();
    else
      this.widget = new libui.UiVerticalSeparator();
  }
}
