const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextNode, Comment, Box, Button } = require( 'libui-node-dom' );

describe( 'Box', () => {
  it( 'constructor', () => {
    const box = new Box( 'Box' );

    expect( box.parentNode ).to.be.null;
    expect( box.prevSibling ).to.be.null;
    expect( box.nextSibling ).to.be.null;
    expect( box.tagName ).to.equal( 'Box' );
    expect( box.childNodes ).to.be.an( 'array' ).that.is.empty;
    expect( box.attributes ).to.be.deep.equal( {
      visible: true,
      enabled: true,
      stretchy: false,
      label: '',
      horizontal: false,
      padded: false
    } );
    expect( box.handlers ).to.be.an( 'object' ).that.is.empty;
    expect( box.widget ).to.be.null;
  } );

  describe( '_mountWidget', () => {
    it( 'default', () => {
      const box = new Box( 'Box' );

      box._mountWidget();

      expect( box.widget ).to.be.an.instanceof( libui.UiVerticalBox );

      expect( box.widget.visible ).to.be.true;
      expect( box.widget.enabled ).to.be.true;
      expect( box.widget.padded ).to.be.false;
      expect( box.widget.children ).to.be.an( 'array' ).that.is.empty;
    } );

    it( 'horizontal', () => {
      const box = new Box( 'Box' );

      box.setAttribute( 'horizontal', true );

      box._mountWidget();

      expect( box.widget ).to.be.an.instanceof( libui.UiHorizontalBox );
    } );

    it( 'with attributes', () => {
      const box = new Box( 'Box' );

      box.setAttribute( 'visible', false );
      box.setAttribute( 'enabled', false );
      box.setAttribute( 'padded', true );

      box._mountWidget();

      expect( box.widget.visible ).to.be.false;
      expect( box.widget.enabled ).to.be.false;
      expect( box.widget.padded ).to.be.true;
    } );

    it( 'with child text node fails', () => {
      const box = new Box( 'Box' );
      const text = new TextNode( 'foo' );

      box.appendChild( text );

      expect( () => button._mountWidget() ).to.throw();
    } );

    it( 'with child widgets', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const comment = new Comment( 'foo' );
      const button2 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( comment );
      box.appendChild( button2 );

      sinon.spy( libui.UiBox.prototype, 'append' );

      box._mountWidget();

      expect( button1.widget ).to.be.instanceof( libui.UiButton );
      expect( button2.widget ).to.be.instanceof( libui.UiButton );

      expect( libui.UiBox.prototype.append ).to.have.been.calledOn( box.widget ).and.calledWith( button1.widget, false )
        .and.subsequently.calledOn( box.widget ).and.calledWith( button2.widget, false );

      expect( box.widget.children ).to.deep.equal( [ button1.widget, button2.widget ] );
    } );

    it( 'with stretchy child widget', () => {
      const box = new Box( 'Box' );
      const button = new Button( 'Button' );

      button.setAttribute( 'stretchy', true );

      box.appendChild( button );

      sinon.spy( libui.UiBox.prototype, 'append' );

      box._mountWidget();

      expect( libui.UiBox.prototype.append ).to.have.been.calledOn( box.widget ).and.calledWith( button.widget, true );
    } );
  } );

  describe( 'manipulate children after _mountWidget', () => {
    it( 'appendChild element', () => {
      const box = new Box( 'Box' );
      const button = new Button( 'Button' );

      box._mountWidget();

      sinon.spy( libui.UiBox.prototype, 'append' );

      box.appendChild( button );

      expect( button.widget ).to.be.instanceof( libui.UiButton );

      expect( libui.UiBox.prototype.append ).to.have.been.calledOn( box.widget ).and.calledWith( button.widget, false );

      expect( box.widget.children ).to.deep.equal( [ button.widget ] );
    } );

    it( 'appendChild text node fails', () => {
      const box = new Box( 'Box' );
      const text = new TextNode( 'foo' );

      box._mountWidget();

      expect( () => box.appendChild( text ) ).to.throw();
    } );

    it( 'appendChild comment', () => {
      const box = new Box( 'Box' );
      const comment = new Comment( 'foo' );

      box._mountWidget();

      box.appendChild( comment );

      expect( box.widget.children ).to.be.an( 'array' ).that.is.empty;
    } );

    function expectChildren( parent, childNodes ) {
      for ( let i = 0; i < childNodes.length; i++ ) {
        expect( childNodes[ i ].parentNode ).to.equal( parent );
        expect( childNodes[ i ].widget ).to.be.not.null;
        expect( childNodes[ i ].widgetIndex ).to.equal( i );
      }

      expect( parent.widget.children ).to.deep.equal( childNodes.map( ch => ch.widget ) );
    }

    it( 'insertBefore at the start', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );

      box._mountWidget();

      box.insertBefore( button3, button1 );

      expectChildren( box, [ button3, button1, button2 ] );
    } );

    it( 'insertBefore at the end', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );

      box._mountWidget();

      box.insertBefore( button3, null );

      expectChildren( box, [ button1, button2, button3 ] );
    } );

    it( 'insertBefore in the middle', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );

      box._mountWidget();

      box.insertBefore( button3, button2 );

      expectChildren( box, [ button1, button3, button2 ] );
    } );

    it( 'insertBefore move to the start', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.insertBefore( button2, button1 );

      expectChildren( box, [ button2, button1, button3 ] );
    } );

    it( 'insertBefore move to the end', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.insertBefore( button2, null );

      expectChildren( box, [ button1, button3, button2 ] );
    } );

    it( 'insertBefore move left', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );
      const button4 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );
      box.appendChild( button4 );

      box._mountWidget();

      box.insertBefore( button3, button2 );

      expectChildren( box, [ button1, button3, button2, button4 ] );
    } );

    it( 'insertBefore move right', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );
      const button4 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );
      box.appendChild( button4 );

      box._mountWidget();

      box.insertBefore( button2, button4 );

      expectChildren( box, [ button1, button3, button2, button4 ] );
    } );

    it( 'insertBefore move with comments', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );
      const comment1 = new Comment( 'foo' );
      const comment2 = new Comment( 'bar' );

      box.appendChild( button1 );
      box.appendChild( comment1 );
      box.appendChild( button2 );
      box.appendChild( comment2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.insertBefore( button3, comment1 );
      box.insertBefore( button1, comment2 );

      expectChildren( box, [ button3, button2, button1 ] );
    } );

    it( 'removeChild from the start', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.removeChild( button1 );

      expectChildren( box, [ button2, button3 ] );
    } );

    it( 'removeChild from the end', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.removeChild( button3 );

      expectChildren( box, [ button1, button2 ] );
    } );

    it( 'removeChild from the middle', () => {
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );
      const button3 = new Button( 'Button' );

      box.appendChild( button1 );
      box.appendChild( button2 );
      box.appendChild( button3 );

      box._mountWidget();

      box.removeChild( button2 );

      expectChildren( box, [ button1, button3 ] );
    } );

    it( 'removeChild destroys removed widgets', () => {
      const box = new Box( 'Box' );
      const box2 = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );

      box.appendChild( box2 );
      box2.appendChild( button1 );
      box2.appendChild( button2 );

      box._mountWidget();

      sinon.spy( libui.UiControl.prototype, 'destroy' );

      const widget = box2.widget;

      box.removeChild( box2 );

      expect( box.childNodes ).to.be.an( 'array' ).that.is.empty;

      expect( box2.widget ).to.be.null;
      expect( button1.widget ).to.be.null;
      expect( button2.widget ).to.be.null;

      expect( libui.UiControl.prototype.destroy ).to.have.been.calledOn( widget );
    } );
  } );
} );
