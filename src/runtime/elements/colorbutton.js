import libui from 'libui-node'

import { Widget } from './widget'

export class ColorButton extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: new libui.Color( 0, 0, 0, 1 )
    };
  }

  _createWidget() {
    this.widget = new libui.UiColorButton();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this.widget.color = this.attributes.value;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'value' ) {
      const oldValue = this.widget.color;
      if ( oldValue.r != value.r || oldValue.g != value.g || oldValue.b != value.b || oldValue.a != value.a )
        this.widget.color = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'change' ) {
      this.widget.onChanged( () => {
        handler( this.widget.color );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
