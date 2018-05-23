import libui from 'libui-node'
import Color from 'color';

import { Widget } from './widget'

export class ColorButton extends Widget {
  getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      color: 'black'
    };
  }

  _createWidget() {
    this.widget = new libui.UiColorButton();
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    if (this.attributes.color != '')
      this.widget.color = this._toColor(this.attributes.color);
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'color' ) {
      if ( this.widget.color != this._toColor(value) )
        this.widget.color = this._toColor(value);
    } else {
      super._setWidgetAttribute( key, value );
    }
  }

  _setWidgetHandler( event, handler ) {
    if ( event == 'changed' ){
      this.widget.onChanged( () => {
        handler( this._toHex(this.widget.color) );
      } );
    } else {
      super._setWidgetHandler( event, handler );
    }
  }

  /**
   * Hex string color to libui
   * @param input
   * @returns {Color}
   * @private
   */
  _toColor(input) {
    input = input.toLowerCase();
    let alpha;
    let c = Color(input).object();
    if (this._exists(c.alpha)) {
      alpha = c.alpha;
    } else if (this._exists(c.a)) {
      alpha = c.a;
    } else {
      alpha = 1;
    }
    return new libui.Color(c.r / 255, c.g / 255, c.b / 255, alpha);
  }

  /**
   * Libui color to hex string
   * @param colorObj
   * @returns {*}
   * @private
   */
  _toHex(colorObj) {
    return Color({
      r: Math.round(colorObj.r * 255),
      g: Math.round(colorObj.g * 255),
      b: Math.round(colorObj.b * 255),
      /*a: colorObj.a,*/  // TODO: assign alpha
    }).hex().toString();
  }

  _exists(a) {
    return typeof a !== 'undefined';
  }

}
