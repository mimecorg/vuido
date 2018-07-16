import libui from 'libui-node'

import { Widget } from './widget'

export class TextArea extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: '',
      readonly: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiMultilineEntry();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.value != '' && this.attributes.value != null )
      this.widget.text = this.attributes.value;
    if ( this.attributes.readonly )
      this.widget.readOnly = true;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'value' ) {
      if ( value == null )
        value = '';
      if ( this.widget.text != value )
        this.widget.text = value;
    } else if ( key == 'readonly' ) {
      this.widget.readOnly = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'input' ) {
      this.widget.onChanged( () => {
        handler( this.widget.text );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
