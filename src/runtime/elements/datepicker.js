import libui from 'libui-node'

import { Widget } from './widget'

export class DatePicker extends Widget {
  _createWidget() {
    this.widget = new libui.UiDatePicker();
  }
}
