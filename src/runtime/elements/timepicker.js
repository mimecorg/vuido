import libui from 'libui-node'

import { Widget } from './widget'

export class TimePicker extends Widget {
  _createWidget() {
    this.widget = new libui.UiTimePicker();
  }
}
