import { Element } from './element'
import { TextNode } from '../nodes/textnode'

export class Widget extends Element {
  constructor( tagName ) {
    super( tagName );

    this.widget = null;
    this.widgetIndex = null;
  }

  appendChild( childNode ) {
    super.appendChild( childNode );

    if ( this.widget != null ) {
      if ( childNode instanceof Element )
        this._appendElement( childNode );
      else if ( childNode instanceof TextNode )
        this._setWidgetText( child.text );
    }
  }

  insertBefore( childNode, referenceNode ) {
    const index = super.insertBefore( childNode, referenceNode );

    if ( this.widget != null ) {
      if ( childNode instanceof Element )
        this._insertElement( childNode, index );
    }

    return index;
  }

  removeChild( childNode ) {
    super.removeChild( childNode );

    if ( this.widget != null ) {
      if ( childNode instanceof Element )
        this._removeElement( childNode );
    }
  }

  setAttribute( key, value ) {
    super.setAttribute( key, value );

    if ( this.widget != null )
      this._setWidgetAttribute( key, value );
  }

  addEventListener( event, handler ) {
    super.addEventListener( event, handler );

    if ( this.widget != null )
      this._setWidgetHandler( event, handler );
  }

  removeEventListener( event ) {
    super.removeEventListener( event );

    if ( this.widget != null )
      this._setWidgetHandler( event, null );
  }

  _mountWidget() {
    this._createWidget();
    this._initializeWidgetAttributes();

    for ( let key in this.handlers )
      this._setWidgetHandler( key, this.handlers[ key ] );

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Element )
        this._appendElement( childNode );
      else if ( childNode instanceof TextNode )
        this._setWidgetText( childNode.text );
    }
  }

  _getDefaultAttributes() {
    return {
      visible: true,
      enabled: true,
      stretchy: false
    };
  }

  _createWidget() {
    throw new Error( this.tagName + ' cannot be created' );
  }

  _destroyWidget() {
    this.widget.destroy();
    this.widget = null;

    this.childNodes = [];
  }

  _appendElement( childNode ) {
    if ( !( childNode instanceof Widget ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    childNode._mountWidget();
    this._appendWidget( childNode );

    childNode.widgetIndex = this.childNodes.indexOf( childNode );
  }

  _insertElement( childNode, index ) {
    if ( !( childNode instanceof Widget ) )
      throw new Error( this.tagName + ' cannot contain ' + childNode.tagName + ' elements' );

    for ( let i = this.childNodes.length - 1; i > index; i-- ) {
      const tailNode = this.childNodes[ i ];
      if ( tailNode instanceof Element )
        this._removeWidget( tailNode );
    }

    childNode._mountWidget();
    this._appendWidget( childNode );

    for ( let i = index + 1; i < this.childNodes.length; i++ ) {
      const tailNode = this.childNodes[ i ];
      if ( tailNode instanceof Element )
        this._appendWidget( tailNode );
    }

    this._reindexChildWidgets();
  }

  _removeElement( childNode ) {
    this._removeWidget( childNode );

    childNode._destroyWidget();

    this._reindexChildWidgets();
  }

  _appendWidget( childNode ) {
    throw new Error( this.tagName + ' cannot contain child widgets' );
  }

  _removeWidget( childNode ) {
    throw new Error( this.tagName + ' cannot contain child widgets' );
  }

  _setContentText( text ) {
    if ( this.widget != null )
      this._setWidgetText( text );
  }

  _setWidgetText( text ) {
    throw new Error( this.tagName + ' cannot contain text nodes' );
  }

  _initializeWidgetAttributes() {
    if ( !this.attributes.visible )
      this.widget.visible = false;
    if ( !this.attributes.enabled )
      this.widget.enabled = false;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'visible' )
      this.widget.visible = value;
    else if ( key == 'enabled' )
      this.widget.enabled = value;
    else
      throw new Error( this.tagName + ' does not have attribute ' + key );
  }

  _setWidgetHandler( event, handler ) {
    throw new Error( this.tagName + ' does not have event ' + event );
  }

  _reindexChildWidgets() {
    let index = 0;
    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof Widget )
        childNode.widgetIndex = index++;
    }
  }
}
