import libui from 'libui-node'

import {Widget} from './widget'

export class ProgressBar extends Widget {
  getDefaultAttributes() {
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
}
