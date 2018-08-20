const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextArea } = require( 'libui-node-dom' );

describe( 'TextArea', () => {
  it( 'default', () => {
      const text = new TextArea( 'TextArea' );

      text._mountWidget();

      expect( text.widget ).to.be.an.instanceof( libui.UiMultilineEntry );

      expect( text.widget.visible ).to.be.true;
      expect( text.widget.enabled ).to.be.true;
      expect( text.widget.text ).to.be.empty;
      expect( text.widget.readOnly ).to.be.false;
  } );

  it( 'with attributes and event listener', () => {
      const text = new TextArea( 'TextArea' );
      const handler = sinon.stub();

      text.setAttribute( 'value', 'foo' );
      text.setAttribute( 'readonly', true );
      text.addEventListener( 'input', handler );

      sinon.spy( libui.UiMultilineEntry.prototype, 'onChanged' );

      text._mountWidget();

      expect( text.widget.text ).to.equal( 'foo' );
      expect( text.widget.readOnly ).to.be.true;

      expect( libui.UiMultilineEntry.prototype.onChanged ).to.have.been.calledOn( text.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 'foo' );
        return true;
      } ) );
  } );
} );
