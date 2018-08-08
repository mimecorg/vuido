import libui from 'libui-node'

import { Widget } from './widget'

export class ProgressBar extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: 0
    };
  }

  _createWidget() {
    this.widget = new libui.UiProgressBar();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.value != 0 )
      this.widget.value = this.attributes.value;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'value' ) {
      if ( this.widget.value != value )
        this.widget.value = value;
    } else {
      super._setWidgetAttribute( key, value );
    }
  }
}
