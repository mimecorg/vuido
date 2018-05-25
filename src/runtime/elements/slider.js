import libui from 'libui-node'

import {Widget} from './widget'

export class Slider extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: 0,
      min: 0,
      max: 100
    };
  }

  _createWidget() {
    if (this.attributes.min >= this.attributes.max)
      throw new Error( `Slider attribute 'min' can not be greater than 'max'`);
    
      this.widget = new libui.UiSlider(this.attributes.min, this.attributes.max);
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.value != '')
      this.widget.setValue(this.attributes.value);
  }

  _setWidgetAttribute(key, value) {
    if (key == 'value') {
      if (this.widget.getValue() != value)
        this.widget.setValue(value);
    } else {
      super._setWidgetAttribute(key, value);
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'changed' ) {
      this.widget.onChanged( () => {
        handler( this.widget.getValue() );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }
}
