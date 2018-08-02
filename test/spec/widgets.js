const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextNode, Button } = require( 'libui-node-dom' );

describe( 'widgets', () => {
  describe( 'Button', () => {
    it( 'constructor', () => {
      const button = new Button( 'Button' );

      expect( button.parentNode ).to.be.null;
      expect( button.prevSibling ).to.be.null;
      expect( button.nextSibling ).to.be.null;
      expect( button.tagName ).to.equal( 'Button' );
      expect( button.childNodes ).to.be.an( 'array' ).that.is.empty;
      expect( button.attributes ).to.be.deep.equal( {
        visible: true,
        enabled: true,
        stretchy: false,
        label: ''
      } );
      expect( button.handlers ).to.be.an( 'object' ).that.is.empty;
      expect( button.widget ).to.be.null;
    } );

    it( '_mountWidget', () => {
      const button = new Button( 'Button' );

      button._mountWidget();

      expect( button.widget ).to.be.an.instanceof( libui.UiButton );

      expect( button.widget.visible ).to.be.true;
      expect( button.widget.enabled ).to.be.true;
      expect( button.widget.text ).to.be.empty;
    } );

    it( '_mountWidget with attributes', () => {
      const button = new Button( 'Button' );

      button.setAttribute( 'visible', false );
      button.setAttribute( 'enabled', false );

      button._mountWidget();

      expect( button.widget.visible ).to.be.false;
      expect( button.widget.enabled ).to.be.false;
    } );

    it( '_mountWidget with event listener', () => {
      const button = new Button( 'Button' );
      const handler = sinon.stub();

      sinon.spy( libui.UiButton.prototype, 'onClicked' );

      button.addEventListener( 'click', handler );

      button._mountWidget();

      expect( libui.UiButton.prototype.onClicked ).to.be.calledOn( button.widget ).and.calledWith( handler );
    } );

    it( '_mountWidget with child text node', () => {
      const button = new Button( 'Button' );
      const text = new TextNode( 'foo' );

      button.appendChild( text );

      button._mountWidget();

      expect( button.widget.text ).to.equal( 'foo' );
    } );

    it( '_mountWidget with child element fails', () => {
      const button = new Button( 'Button' );
      const child = new Button( 'Button' );

      button.appendChild( child );

      expect( () => button._mountWidget() ).to.throw();
    } );

    it( 'setAttribute after mount', () => {
      const button = new Button( 'Button' );

      button._mountWidget();

      button.setAttribute( 'visible', false );
      button.setAttribute( 'enabled', false );

      expect( button.widget.visible ).to.be.false;
      expect( button.widget.enabled ).to.be.false;
    } );

    it( 'addEventListener after mount', () => {
      const button = new Button( 'Button' );
      const handler = sinon.stub();

      sinon.spy( libui.UiButton.prototype, 'onClicked' );

      button._mountWidget();

      button.addEventListener( 'click', handler );

      expect( libui.UiButton.prototype.onClicked ).to.be.calledOn( button.widget ).and.calledWith( handler );
    } );

    it( 'removeEventListener after mount', () => {
      const button = new Button( 'Button' );
      const handler = sinon.stub();

      button.addEventListener( 'click', handler );

      button._mountWidget();

      sinon.spy( libui.UiButton.prototype, 'onClicked' );

      button.removeEventListener( 'click' );

      expect( libui.UiButton.prototype.onClicked ).to.be.calledOn( button.widget ).and.calledWith( null );
    } );

    it( 'appendChild text node after mount', () => {
      const button = new Button( 'Button' );
      const text = new TextNode( 'foo' );

      button._mountWidget();

      button.appendChild( text );

      expect( button.widget.text ).to.equal( 'foo' );
    } );

    it( 'setText on child text node after mount', () => {
      const button = new Button( 'Button' );
      const text = new TextNode( 'foo' );

      button.appendChild( text );

      button._mountWidget();

      text.setText( 'bar' );

      expect( button.widget.text ).to.equal( 'bar' );
    } );
  } );
} );
