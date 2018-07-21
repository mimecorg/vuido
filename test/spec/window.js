const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { Window } = require( 'libui-node-dom' );

describe( 'Window', () => {
  it( 'constructor', () => {
    const window = new Window( 'Window' );

    expect( window.tagName ).to.equal( 'Window' );
    expect( window.window ).to.be.null;
  } );

  it( 'default attributes', () => {
    const window = new Window( 'Window' );

    expect( window.attributes.title ).to.equal( 'Vuido' );
    expect( window.attributes.width ).to.equal( 400 );
    expect( window.attributes.height ).to.equal( 300 );
    expect( window.attributes.menu ).to.be.false;
    expect( window.attributes.margined ).to.be.false;
    expect( window.attributes.fullscreen ).to.be.false;
    expect( window.attributes.borderless ).to.be.false;
  } );

  describe( 'mount', () => {
    it( 'create and show UiWindow', () => {
      sinon.spy( libui.UiWindow.prototype, 'show' );

      const window = new Window( 'Window' );

      window._mountWindow();

      expect( window.window ).to.be.an( 'object' );
      expect( libui.UiWindow.prototype.show ).to.have.been.calledOn( window.window );
    } );

    it( 'pass attributes to UiWindow', () => {
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
      expect( window.window.width ).to.equal( 800 );
      expect( window.window.height ).to.equal( 600 );
      expect( window.window.menu ).to.be.true;
      expect( window.window.margined ).to.be.true;
      expect( window.window.fullscreen ).to.be.true;
      expect( window.window.borderless ).to.be.true;
    } );
  } );
} );
