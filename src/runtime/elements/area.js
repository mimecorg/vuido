import libui from 'libui-node'

import { Widget } from './widget'
import { AreaItem } from './areaitem'

export class Area extends Widget {
  constructor( tagName ) {
    super( tagName );

    this.areaHandlers = {
      draw: null,
      mousedown: null,
      mouseup: null,
      mousemove: null,
      mouseenter: null,
      mouseleave: null,
      dragbroken: null,
      keydown: null,
      keyup: null
    };
  }

  redraw() {
    if ( this.widget != null )
      this.widget.queueRedrawAll();
  }

  _appendElement( childNode ) {
    if ( !( childNode instanceof AreaItem ) )
      throw new Error( 'Area can only contain child area items' );

    childNode._attach( this );

    this.redraw();
  }

  _insertElement( childNode, prevIndex ) {
    if ( !( childNode instanceof AreaItem ) )
      throw new Error( 'Area can only contain child area items' );

    if ( prevIndex < 0 )
      childNode._attach( this );

    this.redraw();
  }

  _removeElement( childNode ) {
    childNode._detach();

    this.redraw();
  }

  _getDefaultAttributes() {
    return {
      ...super._getDefaultAttributes(),
      scrollable: false,
      width: 0,
      height: 0
    };
  }

  _createWidget() {
    const draw = ( area, params ) => {
      if ( this.childNodes.length > 0 )
        this._drawChildItems( params );

      if ( this.areaHandlers.draw != null )
        this.areaHandlers.draw( params );
    };

    const mouseEvent = ( area, event ) => {
      if ( event.getDown() != 0 ) {
        if ( this.areaHandlers.mousedown != null )
          this.areaHandlers.mousedown( event );
      } else if ( event.getUp() != 0 ) {
        if ( this.areaHandlers.mouseup != null )
          this.areaHandlers.mouseup( event );
      } else {
        if ( this.areaHandlers.mousemove != null )
          this.areaHandlers.mousemove( event );
      }
    };

    const mouseCrossed = ( area, didLeave ) => {
      if ( !didLeave ) {
        if ( this.areaHandlers.mouseenter != null )
          this.areaHandlers.mouseenter();
      } else {
        if ( this.areaHandlers.mouseleave != null )
          this.areaHandlers.mouseleave();
      }
    };

    const dragBroken = ( area ) => {
      if ( this.areaHandlers.dragbroken != null )
        this.areaHandlers.dragbroken();
    };

    const keyEvent = ( area, event ) => {
      if ( !event.getUp() ) {
        if ( this.areaHandlers.keydown != null )
          return this.areaHandlers.keydown( event );
      } else {
        if ( this.areaHandlers.keyup != null )
          return this.areaHandlers.keyup( event );
      }
    };

    if ( this.attributes.scrollable )
      this.widget = new libui.UiArea( draw, mouseEvent, mouseCrossed, dragBroken, keyEvent, this.attributes.width, this.attributes.height );
    else
      this.widget = new libui.UiArea( draw, mouseEvent, mouseCrossed, dragBroken, keyEvent );
  }

  _setWidgetAttribute( key, value ) {
    if ( key == 'width' )
      this.widget.setSize( value, this.attributes.height );
    else if ( key == 'height' )
      this.widget.setSize( this.attributes.width, value );
    else
      super._setWidgetAttribute( key, value );
  }

  _setWidgetHandler( event, handler ) {
    if ( this.areaHandlers.hasOwnProperty( event ) )
      this.areaHandlers[ event ] = handler;
    else
      super._setWidgetHandler( event, handler );
  }

  _drawChildItems( params ) {
    const context = params.getContext();

    const line = new libui.DrawStrokeParams();
    line.thickness = 1;

    const style = {
      fill: null,
      stroke: null,
      line
    };

    for ( let i = 0; i < this.childNodes.length; i++ ) {
      const childNode = this.childNodes[ i ];
      if ( childNode instanceof AreaItem )
        childNode._drawItem( context, style );
    }
  }
}
