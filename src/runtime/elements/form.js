import libui from 'libui-node'

import { Widget } from './widget'

export class Form extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      padded: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiForm();
  }

  _appendWidget( childNode ) {
    this.widget.append( childNode.attributes.label, childNode.widget, childNode.attributes.stretchy );
  }

  _removeWidget( childNode ) {
    this.widget.deleteAt( childNode.widgetIndex );
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if ( this.attributes.padded )
      this.widget.padded = true;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'padded' )
      this.widget.padded = value;
    else
      super._setWidgetAttribute( key, value );
  }
}
