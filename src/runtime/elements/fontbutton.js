import libui from 'libui-node'

import {Widget} from './widget'

export class FontButton extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      font: ''
    };
  }

  _createWidget() {
    this.widget = new libui.UiFontButton();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.font != '')
      this.widget.font = this.attributes.font;
  }

  _setWidgetAttribute(key, value) {
    if (key == 'font') {
      if (this.widget.font != value)
        this.widget.font = value;
    } else {
      super._setWidgetAttribute(key, value);
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'changed' ){
      this.widget.onChanged( () => {
        handler( this.widget.getFont() ); // return FontDescriptor()
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }

}
