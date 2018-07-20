import { AreaItem } from './areaitem'

export class AreaPath extends AreaItem {
  _getDefaultAttributes() {
    return {
      path: null,
      fill: null,
      stroke: null,
      line: null
    };
  }

  _drawItem( context, style ) {
    const path = this.attributes.path;
    if ( path != null ) {
      const fill = this.attributes.fill || style.fill;
      const stroke = this.attributes.stroke || style.stroke;
      const line = this.attributes.line || style.line;
      if ( fill != null )
        context.fill( path, fill );
      if ( stroke != null )
        context.stroke( path, stroke, line );
    }
  }

  _setItemAttribute( key, value ) {
    switch ( key ) {
      case 'path':
      case 'fill':
      case 'stroke':
      case 'line':
        this._redrawArea();
        break;

      default:
        this._setItemAttribute( key, value );
        break;
    }
  }
}
