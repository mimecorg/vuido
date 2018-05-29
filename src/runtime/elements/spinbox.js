import libui from 'libui-node'

import {Widget} from './widget'

export class Spinbox extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: 0,
      min: 0,
      max: 100
    };
  }

  _createWidget() {
    if ( this.attributes.min >= this.attributes.max )
      throw new Error( 'Spinbox min value must be less than max value' );

    this.widget = new libui.UiSpinbox( this.attributes.min, this.attributes.max );
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this.widget.value = this.attributes.value;
  }

  _setWidgetAttribute(key, value) {
    if ( key == 'value' ) {
      if ( this.widget.value != value )
        this.widget.value = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'change' ) {
      this.widget.onChanged( () => {
        handler( this.widget.value );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
