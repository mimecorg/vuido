import libui from 'libui-node'

import {Widget} from './widget'

export class Checkbox extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      text: '',
      checked: false
    };
  }

  _createWidget() {
    this.widget = new libui.UiCheckbox();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.text != '')
      this.widget.text = this.attributes.text;
    if (this.attributes.checked || this.attributes.checked == '')
      this.widget.checked = true;
  }

  _setWidgetAttribute(key, value) {
    if (key == 'text') {
      if (this.widget.text != value)
        this.widget.text = value;
    } else if (key == 'checked') {
      this.widget.checked = value;
    } else {
      super._setWidgetAttribute(key, value);
    }
  }

  _setWidgetHandler(event, handler) {
    if (event == 'toggled') {
      this.widget.onToggled(() => {
        handler(this.widget.checked);
      });
    } else {
      super._setWidgetHandler(event, handler);
    }
  }
}
