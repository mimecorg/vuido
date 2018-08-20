const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextInput } = require( 'libui-node-dom' );

describe( 'TextInput', () => {
  it( 'constructor', () => {
    const input = new TextInput( 'TextInput' );

    expect( input.parentNode ).to.be.null;
    expect( input.prevSibling ).to.be.null;
    expect( input.nextSibling ).to.be.null;
    expect( input.tagName ).to.equal( 'TextInput' );
    expect( input.childNodes ).to.be.an( 'array' ).that.is.empty;
    expect( input.attributes ).to.deep.equal( {
      visible: true,
      enabled: true,
      stretchy: false,
      label: '',
      type: 'text',
      value: '',
      readonly: false
    } );
    expect( input.handlers ).to.be.an( 'object' ).that.is.empty;
    expect( input.widget ).to.be.null;
  } );

  describe( '_mountWidget', () => {
    it( 'default', () => {
      const input = new TextInput( 'TextInput' );

      input._mountWidget();

      expect( input.widget ).to.be.an.instanceof( libui.UiEntry );

      expect( input.widget.visible ).to.be.true;
      expect( input.widget.enabled ).to.be.true;
      expect( input.widget.text ).to.be.empty;
      expect( input.widget.readOnly ).to.be.false;
    } );

    it( 'with attributes', () => {
      const input = new TextInput( 'TextInput' );

      input.setAttribute( 'readonly', true );
      input.setAttribute( 'value', 'foo' );

      input._mountWidget();

      expect( input.widget.text ).to.equal( 'foo' );
      expect( input.widget.readOnly ).to.be.true;
    } );

    it( 'password type', () => {
      const input = new TextInput( 'TextInput' );

      input.setAttribute( 'type', 'password' );

      input._mountWidget();

      expect( input.widget ).to.be.an.instanceof( libui.UiPasswordEntry );
    } );

    it( 'search type', () => {
      const input = new TextInput( 'TextInput' );

      input.setAttribute( 'type', 'search' );

      input._mountWidget();

      expect( input.widget ).to.be.an.instanceof( libui.UiSearchEntry );
    } );

    it( 'with event listener', () => {
      const input = new TextInput( 'TextInput' );
      const handler = sinon.stub();

      input.setAttribute( 'value', 'foo' );

      input.addEventListener( 'input', handler );

      sinon.spy( libui.UiEntry.prototype, 'onChanged' );

      input._mountWidget();

      expect( libui.UiEntry.prototype.onChanged ).to.have.been.calledOn( input.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 'foo' );
        return true;
      } ) );
    } );
  } );
} );
