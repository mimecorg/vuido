import libui from 'libui-node'

import {Widget} from './widget'

export class DatePicker extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      value: ''
    };
  }

  _createWidget() {
    this.widget = new libui.UiDatePicker();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.value != '')
      this.widget.text = this.attributes.value;
  }

  _setWidgetAttribute(key, value) {
    if (key == 'value') {
      if (this.widget.text != value)
        this.widget.text = value;
    } else {
      super._setWidgetAttribute(key, value);
    }
  }
}
