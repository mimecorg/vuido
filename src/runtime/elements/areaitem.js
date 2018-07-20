import { Element } from './element'
import { TextNode } from '../nodes/textnode'

export class AreaItem extends Element {
  constructor( tagName ) {
    super( tagName );

    this.area = null;
  }

  appendChild( childNode ) {
    super.appendChild( childNode );

    if ( this.area != null ) {
      if ( childNode instanceof Element )
        this._addElement( childNode );
      else if ( childNode instanceof TextNode )
        throw new Error( this.tagName + ' cannot contain text nodes' );
    }
  }

  insertBefore( childNode, referenceNode ) {
    const prevIndex = childNode.parentNode == this ? this.childNodes.indexOf( childNode ) : -1;

    super.insertBefore( childNode, referenceNode );

    if ( this.area != null ) {
      if ( childNode instanceof Element )
        this._insertElement( childNode, prevIndex );
    }
  }

  removeChild( childNode ) {
    super.removeChild( childNode );

    if ( this.area != null ) {
      if ( childNode instanceof Element )
        this._removeElement( childNode );
    }
  }

  setAttribute( key, value ) {
    super.setAttribute( key, value );

    if ( this.area != null )
      this._setItemAttribute( key, value );
  }

  addEventListener( event, handler ) {
    throw new Error( this.tagName + ' does not have event ' + event );
  }

  removeEventListener( event ) {
    throw new Error( this.tagName + ' does not have event ' + event );
  }

  _attach( area ) {
    this.area = area;

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Element )
        this._addElement( childNode );
      else if ( childNode instanceof TextNode )
        throw new Error( this.tagName + ' cannot contain text nodes' );
    }
  }

  _detach() {
    this.area = null;

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Element )
        childNode._detach();
    }
  }

  _drawItem( context, style ) {
    throw new Error( this.tagName + ' does not have a draw method' );
  }

  _addElement( childNode ) {
    throw new Error( this.tagName + ' cannot contain child elements' );
  }

  _insertElement( childNode, prevIndex ) {
    throw new Error( this.tagName + ' cannot contain child elements' );
  }

  _removeElement( childNode ) {
    throw new Error( this.tagName + ' cannot contain child elements' );
  }

  _setItemAttribute( key, value ) {
    throw new Error( this.tagName + ' does not have attribute ' + key );
  }

  _redrawArea() {
    if ( this.area != null )
      this.area.redraw();
  }
}
