import libui from 'libui-node'

import { Widget } from './widget'

export class Button extends Widget {
  _createWidget() {
    this.widget = new libui.UiButton();
  }

  _setWidgetText( text ) {
    this.widget.text = text;
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'click' )
      this.widget.onClicked( handler );
    else
      super._setWidgetHandler( event, handler );
  }
}
