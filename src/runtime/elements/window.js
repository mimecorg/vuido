import libui from 'libui-node'

import { Element } from './element'
import { Widget } from './widget';

export class Window extends Element {
  constructor( tagName ) {
    super( tagName );

    this.window = null;

    this.showHandler = null;
  }

  appendChild( childNode ) {
    super.appendChild( childNode );

    if ( !( childNode instanceof Widget ) )
      throw new Error( 'Window can only contain child widgets' );

    if ( this.childNodes.length > 1 )
      throw new Error( 'Window can only contain one child element' );

    if ( this.window != null )
      throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  insertBefore( childNode, referenceNode ) {
    throw new Error( 'Window child element cannot be inserted dynamically' );
  }

  removeChild( childNode ) {
    throw new Error( 'Window child element cannot be removed dynamically' );
  }

  setAttribute( key, value ) {
    super.setAttribute( key, value );

    if ( this.window != null )
      this._setWindowAttribute( key, value );
  }

  addEventListener( event, handler ) {
    super.addEventListener( event, handler );

    if ( this.window != null )
      this._setWindowHandler( event, handler );
  }

  removeEventListener( event ) {
    super.removeEventListener( event );

    if ( this.window != null )
      this._setWindowHandler( event, null );
  }

  _getDefaultAttributes() {
    return {
      title: 'Vuido',
      width: 400,
      height: 300,
      menu: false,
      margined: false
    };
  }

  _mountWindow() {
    this.window = new libui.UiWindow( this.attributes.title, this.attributes.width, this.attributes.height, this.attributes.menu );

    if ( this.attributes.margined )
      this.window.margined = true;

    for ( let key in this.handlers )
      this._setWindowHandler( key, this.handlers[ key ] );

    if ( this.childNodes.length > 0 ) {
      this.childNodes[ 0 ]._mountWidget();
      this.window.setChild( this.childNodes[ 0 ].widget );
    }

    if ( this.showHandler != null )
      this.showHandler();

    this.window.show();
  }

  _destroyWindow() {
    this.window.close();
    this.window = null;

    this.childNodes = [];
  }

  _setWindowAttribute( key, value ) {
    throw new Error( 'Window does not have attribute ' + key );
  }

  _setWindowHandler( event, handler ) {
    if ( event == 'close' )
      this.window.onClosing( handler );
    else if ( event == 'show' )
      this.showHandler = handler;
    else
      throw new Error( 'Window does not have event ' + event );
  }
}
