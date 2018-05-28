import libui from 'libui-node'

import { Widget } from './widget'

export class DateTimePicker extends Widget {
  _createWidget() {
    this.widget = new libui.UiDateTimePicker();
  }
}
