import libui from 'libui-node'

import { Widget } from './widget'

export class Text extends Widget {
  _createWidget() {
    this.widget = new libui.UiLabel();
  }

  _setWidgetText( text ) {
    this.widget.text = text;
  }
}
