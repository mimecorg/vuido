import libui from 'libui-node'

import { Element } from './element'
import { Widget } from './widget'

export class Group extends Widget {
  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      title: '',
      margined: false
    };
  }

  appendChild( childNode ) {
    Element.prototype.appendChild.call( this, childNode );

    if ( !( childNode instanceof Widget ) )
      throw new Error( 'Group can only contain child widget' );

    if ( this.childNodes.length > 1 )
      throw new Error( 'Group can only contain one child element' );

    if ( this.widget != null )
      throw new Error( 'Group child element cannot be inserted dynamically' );
  }

  insertBefore( childNode, referenceNode ) {
    throw new Error( 'Group child element cannot be inserted dynamically' );
  }

  removeChild( childNode ) {
    throw new Error( 'Group child element cannot be removed dynamically' );
  }

  _createWidget() {
    this.widget = new libui.UiGroup();
  }

  _appendWidget( childNode ) {
    this.widget.setChild( childNode.widget );
  }

  _initializeWidgetAttributes() {
    super._initializeWidgetAttributes();

    this.widget.title = this.attributes.title;
    if ( this.attributes.margined )
      this.widget.margined = true;
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'title' )
      this.widget.title = value;
    else if ( key == 'margined' )
      this.widget.margined = value;
    else
      super._setWidgetAttribute( key, value );
  }
}
