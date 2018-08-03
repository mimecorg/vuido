const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextNode, Window, Box, Button } = require( 'libui-node-dom' );

describe( 'Window', () => {
  it( 'constructor', () => {
    const window = new Window( 'Window' );

    expect( window.parentNode ).to.be.null;
    expect( window.prevSibling ).to.be.null;
    expect( window.nextSibling ).to.be.null;
    expect( window.tagName ).to.equal( 'Window' );
    expect( window.childNodes ).to.be.an( 'array' ).that.is.empty;
    expect( window.attributes ).to.deep.equal( {
      title: 'Vuido',
      width: 400,
      height: 300,
      menu: false,
      margined: false,
      fullscreen: false,
      borderless: false
    } );
    expect( window.handlers ).to.be.an( 'object' ).that.is.empty;
  } );

  it( 'appendChild with two child widgets fails', () => {
    const window = new Window( 'Window' );
    const button1 = new Button( 'Button' );
    const button2 = new Button( 'Button' );

    window.appendChild( button1 );
    expect( () => window.appendChild( button2 ) ).to.throw();
  } );

  it( 'appendChild text node fails', () => {
    const window = new Window( 'Window' );
    const text = new TextNode( 'foo' );

    expect( () => window.appendChild( text ) ).to.throw();
  } );

  describe( '_mountWindow', () => {
    it( 'default', () => {
      sinon.spy( libui.UiWindow.prototype, 'show' );

      const window = new Window( 'Window' );

      window._mountWindow();

      expect( window.window ).to.be.an.instanceof( libui.UiWindow );

      expect( window.window.title ).to.equal( 'Vuido' );
      expect( window.window.contentSize ).to.deep.equal( new libui.Size( 400, 300 ) );
      expect( window.window.menu ).to.be.false;
      expect( window.window.margined ).to.be.false;
      expect( window.window.fullscreen ).to.be.false;
      expect( window.window.borderless ).to.be.false;

      expect( libui.UiWindow.prototype.show ).to.have.been.calledOn( window.window );
    } );

    it( 'with attributes', () => {
      const window = new Window( 'Window' );

      window.setAttribute( 'title', 'foo' );
      window.setAttribute( 'width', 800 );
      window.setAttribute( 'height', 600 );
      window.setAttribute( 'menu', true );
      window.setAttribute( 'margined', true );
      window.setAttribute( 'fullscreen', true );
      window.setAttribute( 'borderless', true );

      window._mountWindow();

      expect( window.window.title ).to.equal( 'foo' );
      expect( window.window.contentSize ).to.deep.equal( new libui.Size( 800, 600 ) );
      expect( window.window.menu ).to.be.true;
      expect( window.window.margined ).to.be.true;
      expect( window.window.fullscreen ).to.be.true;
      expect( window.window.borderless ).to.be.true;
    } );

    it( 'with event listeners', () => {
      const window = new Window( 'Window' );
      const handler1 = sinon.stub();
      const handler2 = sinon.stub();
      const handler3 = sinon.stub();

      window.addEventListener( 'close', handler1 );
      window.addEventListener( 'resize', handler2 );
      window.addEventListener( 'show', handler3 );

      sinon.spy( libui.UiWindow.prototype, 'onClosing' );
      sinon.spy( libui.UiWindow.prototype, 'onContentSizeChanged' );

      window._mountWindow();

      expect( libui.UiWindow.prototype.onClosing ).to.have.been.calledOn( window.window ).and.calledWith( handler1 );
      expect( libui.UiWindow.prototype.onContentSizeChanged ).to.have.been.calledOn( window.window ).and.calledWith( sinon.match( handler => {
        const size = new libui.Size( 800, 600 );
        window.window.contentSize = size;
        handler();
        expect( handler2 ).to.have.been.calledWith( size );
        return true;
      } ) );
      expect( handler3 ).to.have.been.called;
    } );

    it( 'with child widget', () => {
      const window = new Window( 'Window' );
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );

      window.appendChild( box );
      box.appendChild( button1 );
      box.appendChild( button2 );

      sinon.spy( libui.UiWindow.prototype, 'setChild' );

      window._mountWindow();

      expect( box.widget ).to.be.instanceof( libui.UiBox );
      expect( button1.widget ).to.be.instanceof( libui.UiButton );
      expect( button2.widget ).to.be.instanceof( libui.UiButton );

      expect( libui.UiWindow.prototype.setChild ).to.have.been.calledOn( window.window ).and.calledWith( box.widget );
    } );
  } );

  describe( 'modify after _mountWindow', () => {
    it( 'setAttribute', () => {
      const window = new Window( 'Window' );

      window._mountWindow();

      window.setAttribute( 'title', 'foo' );
      window.setAttribute( 'width', 800 );
      window.setAttribute( 'height', 600 );
      window.setAttribute( 'fullscreen', true );
      window.setAttribute( 'borderless', true );

      expect( window.window.title ).to.equal( 'foo' );
      expect( window.window.contentSize ).to.deep.equal( new libui.Size( 800, 600 ) );
      expect( window.window.fullscreen ).to.be.true;
      expect( window.window.borderless ).to.be.true;
    } );

    it( 'addEventListener', () => {
      const window = new Window( 'Window' );
      const handler = sinon.stub();

      window._mountWindow();

      sinon.spy( libui.UiWindow.prototype, 'onClosing' );

      window.addEventListener( 'close', handler );

      expect( libui.UiWindow.prototype.onClosing ).to.have.been.calledOn( window.window ).and.calledWith( handler );
    } );

    it( 'removeEventListener', () => {
      const window = new Window( 'Window' );
      const handler = sinon.stub();

      window.addEventListener( 'close', handler );

      window._mountWindow();

      sinon.spy( libui.UiWindow.prototype, 'onClosing' );

      window.removeEventListener( 'close' );

      expect( libui.UiWindow.prototype.onClosing ).to.have.been.calledOn( window.window ).and.calledWith( null );
    } );

    it( 'appendChild fails', () => {
      const window = new Window( 'Window' );
      const box = new Box( 'Box' );

      window._mountWindow();

      expect( () => window.appendChild( box ) ).to.throw();
    } );
  } );

  it( '_destroyWindow', () => {
      const window = new Window( 'Window' );
      const box = new Box( 'Box' );
      const button1 = new Button( 'Button' );
      const button2 = new Button( 'Button' );

      window.appendChild( box );
      box.appendChild( button1 );
      box.appendChild( button2 );

      window._mountWindow();

      const uiWindow = window.window;

      sinon.spy( libui.UiWindow.prototype, 'close' );

      window._destroyWindow();

      expect( window.window ).to.be.null;

      expect( libui.UiWindow.prototype.close ).to.have.been.calledOn( uiWindow );
  } );
} );
