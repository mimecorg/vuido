import { AreaItem } from './areaitem'

export class AreaText extends AreaItem {
  _getDefaultAttributes() {
    return {
      x: 0,
      y: 0,
      layout: null
    };
  }

  _drawItem( context, style ) {
    if ( this.attributes.layout != null )
      context.text( this.attributes.x, this.attributes.y, this.attributes.layout );
  }

  _setItemAttribute( key, value ) {
    switch ( key ) {
      case 'x':
      case 'y':
      case 'layout':
        this._redrawArea();
        break;

      default:
        this._setItemAttribute( key, value );
        break;
    }
  }
}
