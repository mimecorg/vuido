import libui from 'libui-node'

import {Widget} from './widget'

export class RadioButtons extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      items: [],
      selected: 0
    };
  }

  _createWidget() {
    this.widget = new libui.UiRadioButtons();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.items != '' && this.attributes.items instanceof Array) {
      this.attributes.items.forEach(item => {
        this.widget.append(item);
      });

      if (this.attributes.selected != '') {
        this.widget.setSelected(this.attributes.selected);
      }
    }
  }

  _setWidgetAttribute(key, value) {
    if (key == 'items') {
      if (this.widget.items != value && value instanceof Array)
        value.forEach(item => {
          this.widget.append(item);
        })
    } else if (key == 'selected') {
      if (this.widget.getSelected() != value)
        this.widget.setSelected(value);
    } else {
      super._setWidgetAttribute(key, value);
    }
  }

  _setWidgetHandler(event, handler) {
    if (event == 'on-selected') {
      this.widget.onSelected(() => {
        handler(this.widget.getSelected());
      });
    } else {
      super._setWidgetHandler(event, handler);
    }
  }
}
