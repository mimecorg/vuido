const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextNode, Checkbox } = require( 'libui-node-dom' );

describe( 'Checkbox', () => {
  it( 'default', () => {
      const checkbox = new Checkbox( 'Checkbox' );

      checkbox._mountWidget();

      expect( checkbox.widget ).to.be.an.instanceof( libui.UiCheckbox );

      expect( checkbox.widget.visible ).to.be.true;
      expect( checkbox.widget.enabled ).to.be.true;
      expect( checkbox.widget.text ).to.be.empty;
      expect( checkbox.widget.checked ).to.be.false;
  } );

  it( 'with text, value and event listener', () => {
      const checkbox = new Checkbox( 'Checkbox' );
      const text = new TextNode( 'foo' );
      const handler = sinon.stub();

      checkbox.setAttribute( 'checked', true );
      checkbox.addEventListener( 'toggle', handler );
      checkbox.appendChild( text );

      sinon.spy( libui.UiCheckbox.prototype, 'onToggled' );

      checkbox._mountWidget();

      expect( checkbox.widget.text ).to.equal( 'foo' );
      expect( checkbox.widget.checked ).to.be.true;

      expect( libui.UiCheckbox.prototype.onToggled ).to.have.been.calledOn( checkbox.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( true );
        return true;
      } ) );
  } );
} );
