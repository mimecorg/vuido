import libui from 'libui-node'

import { Widget } from './widget'

export class TextInput extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      type: 'text',
      value: '',
      readonly: false
    };
  }

  _createWidget() {
    if ( this.attributes.type == 'text' )
      this.widget = new libui.UiEntry();
    else if ( this.attributes.type == 'password' )
      this.widget = new libui.UiPasswordEntry();
    else if ( this.attributes.type == 'search' )
      this.widget = new libui.UiSearchEntry();
    else
      throw new Error( 'Invalid TextInput type ' + this.attributes.type );
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.value != '' )
      this.widget.text = this.attributes.value;
    if ( this.attributes.readonly )
      this.widget.readOnly = true;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'value' ) {
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
