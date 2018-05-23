import libui from 'libui-node'

import {Widget} from './widget'

export class FontButton extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: ''
    };
  }

  _createWidget() {
    this.widget = new libui.UiFontButton();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.value != '')
      this.widget.font = this.attributes.value;
  }

  _setWidgetAttribute(key, value) {
    if (key == 'value') {
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
