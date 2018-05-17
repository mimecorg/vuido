import libui from 'libui-node'

import { Widget } from './widget'

export class Box extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      horizontal: false,
      padded: false
    };
  }

  _createWidget() {
    if ( this.attributes.horizontal )
      this.widget = new libui.UiHorizontalBox();
    else
      this.widget = new libui.UiVerticalBox();
  }

  _appendWidget( childNode ) {
    this.widget.append( childNode.widget, childNode.attributes.stretchy );
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
