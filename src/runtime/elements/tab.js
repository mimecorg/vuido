import libui from 'libui-node'

import { Widget } from './widget'

export class Tab extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes()
    };
  }

  _createWidget() {
    this.widget = new libui.UiTab();
  }

  _appendWidget( childNode ) {
    this.widget.append( childNode.attributes.label || 'Tab', childNode.widget );
  }

  _removeWidget( childNode ) {
    this.widget.deleteAt( childNode.widgetIndex );
  }
}
