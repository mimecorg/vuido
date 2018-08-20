const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { Combobox } = require( 'libui-node-dom' );

describe( 'Combobox', () => {
  it( 'default', () => {
      const combobox = new Combobox( 'Combobox' );

      combobox._mountWidget();

      expect( combobox.widget ).to.be.an.instanceof( libui.UiEditableCombobox );

      expect( combobox.widget.visible ).to.be.true;
      expect( combobox.widget.enabled ).to.be.true;
      expect( combobox.widget.items ).to.be.an( 'array' ).that.is.empty;
      expect( combobox.widget.text ).to.be.empty;
  } );

  it( 'with items and event listener', () => {
      const combobox = new Combobox( 'Combobox' );
      const handler = sinon.stub();

      const items = [ 'item1', 'item2', 'item3' ];

      combobox.setAttribute( 'items', items );
      combobox.setAttribute( 'value', 'foo' );
      combobox.addEventListener( 'input', handler );

      sinon.spy( libui.UiEditableCombobox.prototype, 'onChanged' );

      combobox._mountWidget();

      expect( combobox.widget.items ).to.deep.equal( items );
      expect( combobox.widget.text ).to.equal( 'foo' );

      expect( libui.UiEditableCombobox.prototype.onChanged ).to.have.been.calledOn( combobox.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 'foo' );
        return true;
      } ) );
  } );
} );
