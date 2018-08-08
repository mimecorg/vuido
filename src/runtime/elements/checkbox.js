import libui from 'libui-node'

import {Widget} from './widget'

export class Checkbox extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      checked: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiCheckbox();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.checked )
      this.widget.checked = true;
  }

  _setWidgetAttribute(key, value) {
    if ( key == 'checked' ) {
      if ( this.widget.checked != value )
        this.widget.checked = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'toggle' ) {
      this.widget.onToggled( () => {
        handler( this.widget.checked );
      } );
    } else {
      super._setWidgetHandler(event, handler);
    }
  }

  _setWidgetText( text ) {
    this.widget.text = text;
  }
}
