import { TextNode } from '../nodes/textnode'

export class Element {
  constructor( tagName ) {
    this.parentNode = null;
    this.prevSibling = null;
    this.nextSibling = null;

    this.tagName = tagName;

    this.childNodes = [];

    this.attributes = this._getDefaultAttributes();
    this.handlers = {};
  }

  appendChild( childNode ) {
    if ( childNode == null )
      throw new Error( 'Child node cannot be empty' );

    if ( childNode.parentNode != null )
      throw new Error( 'Child node already has a parent' );

    if ( childNode instanceof TextNode && this.childNodes.length > 0 )
      throw new Error( 'Element cannot contian multiple text nodes' );

    childNode.parentNode = this;

    if ( this.childNodes.length > 0 ) {
      const lastChild = this.childNodes[ this.childNodes.length - 1 ];
      childNode.prevSibling = lastChild;
      lastChild.nextSibling = childNode;
    }

    this.childNodes.push( childNode );
  }

  insertBefore( childNode, referenceNode ) {
    if ( childNode == null )
      throw new Error( 'Child node cannot be empty' );

    if ( referenceNode != null && referenceNode.parentNode != this )
      throw new Error( 'Reference node has invalid parent' );

    if ( childNode.parentNode != null )
      throw new Error( 'Child node already has a parent' );

    if ( childNode instanceof TextNode )
      throw new Error( 'Text node cannot be inserted dynamically' );

    const index = this.childNodes.indexOf( referenceNode );

    childNode.parentNode = this;
    childNode.nextSibling = referenceNode;
    childNode.prevSibling = this.childNodes[ index - 1 ];

    referenceNode.prevSibling = childNode;
    this.childNodes.splice( index, 0, childNode );

    return index;
  }

  removeChild( childNode ) {
    if ( childNode == null )
      throw new Error( 'Child node cannot be empty' );

    if ( childNode.parentNode != this )
      throw new Error( 'Child node has invalid parent' );

    if ( childNode instanceof TextNode )
      throw new Error( 'Text node cannot be removed dynamically' );

    childNode.parentNode = null;

    if ( childNode.prevSibling != null )
      childNode.prevSibling.nextSibling = childNode.nextSibling;

    if ( childNode.nextSibling != null )
      childNode.nextSibling.prevSibling = childNode.prevSibling;

    const index = this.childNodes.indexOf( childNode );

    this.childNodes.splice( index, 1 );
  }

  setAttribute( key, value ) {
    this.attributes[ key ] = value;
  }

  addEventListener( event, handler ) {
    this.handlers[ event ] = handler;
  }

  removeEventListener( event ) {
    delete this.handlers[ event ];
  }

  _getDefaultAttributes() {
    return {};
  }

  _setContentText( text ) {
    throw new Error( this.tagName + ' cannot contain text nodes' );
  }
}
