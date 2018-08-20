import { AreaItem } from './areaitem'

export class AreaGroup extends AreaItem {
  _getDefaultAttributes() {
    return {
      transform: null,
      fill: null,
      stroke: null,
      line: null
    };
  }

  _drawItem( context, style ) {
    const transform = this.attributes.transform;

    if ( transform != null ) {
      context.save();
      context.transform( transform );
    }

    const fill = this.attributes.fill || style.fill;
    const stroke = this.attributes.stroke || style.stroke;
    const line = this.attributes.line || style.line;

    const childStyle = { fill, stroke, line };

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof AreaItem )
        childNode._drawItem( context, childStyle );
    }

    if ( transform != null )
      context.restore();
  }

  _addElement( childNode ) {
    if ( !( childNode instanceof AreaItem ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    childNode._attach( this.area );

    this._redrawArea();
  }

  _insertElement( childNode, prevIndex ) {
    if ( !( childNode instanceof AreaItem ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    if ( prevIndex < 0 )
      childNode._attach( this.area );

    this._redrawArea();
  }

  _removeElement( childNode ) {
    childNode._detach();

    this._redrawArea();
  }

  _setItemAttribute( key, value ) {
    switch ( key ) {
      case 'transform':
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
