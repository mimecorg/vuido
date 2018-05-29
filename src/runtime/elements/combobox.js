import libui from 'libui-node'

import { Widget } from './widget'

export class Combobox extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      items: [],
      value: ''
    };
  }

  _createWidget() {
    this.widget = new libui.UiEditableCombobox();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( !Array.isArray( this.attributes.items ) )
      throw new Error( 'Combobox items must be an array' );

    this.attributes.items.forEach( item => {
      this.widget.append( item );
    } );

    if ( this.attributes.value != '' )
      this.widget.text = this.attributes.value;

    this.items = this.attributes.items;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'items' ) {
      // this attribute must be set dynamically using v-bind, so make sure it's not modified
      if ( !Array.isArray( value ) )
        throw new Error( 'Combobox items must be an array' );
      if ( value.length != this.items.length )
        throw new Error( 'Combobox items cannot be changed dynamically' );
      value.forEach( ( item, index ) => {
        if ( item != this.items[ index ] )
          throw new Error( 'Combobox items cannot be changed dynamically' );
      } );
    } else if ( key == 'value' ) {
      if ( this.widget.text != value )
        this.widget.text = value;
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
