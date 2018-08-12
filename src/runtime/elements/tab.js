import libui from 'libui-node'

import { Widget } from './widget'

export class Tab extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      margined: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiTab();
  }

  _appendWidget( childNode ) {
    this.widget.append( childNode.attributes.label, childNode.widget );

    if ( this.attributes.margined )
      this.widget.setMargined( this.widget.numPages() - 1, true );
  }

  _removeWidget( childNode ) {
    this.widget.deleteAt( childNode.widgetIndex );
  }
}
