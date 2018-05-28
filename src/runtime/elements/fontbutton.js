import libui from 'libui-node'

import {Widget} from './widget'

export class FontButton extends Widget {
  _createWidget() {
    this.widget = new libui.UiFontButton();
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'change' ){
      this.widget.onChanged( () => {
        handler( this.widget.font );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }

  get font() {
    if ( this.widget != null )
      return this.widget.font;
  }
}
