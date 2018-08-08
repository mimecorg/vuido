const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { DropdownList } = require( 'libui-node-dom' );

describe( 'DropdownList', () => {
  it( 'default', () => {
      const dropdown = new DropdownList( 'DropdownList' );

      dropdown._mountWidget();

      expect( dropdown.widget ).to.be.an.instanceof( libui.UiCombobox );

      expect( dropdown.widget.visible ).to.be.true;
      expect( dropdown.widget.enabled ).to.be.true;
      expect( dropdown.widget.items ).to.be.an( 'array' ).that.is.empty;
      expect( dropdown.widget.selected ).to.equal( 0 );
  } );

  it( 'with items and event listener', () => {
      const dropdown = new DropdownList( 'DropdownList' );
      const handler = sinon.stub();

      const items = [ 'item1', 'item2', 'item3' ];

      dropdown.setAttribute( 'items', items );
      dropdown.setAttribute( 'selected', 1 );
      dropdown.addEventListener( 'change', handler );

      sinon.spy( libui.UiCombobox.prototype, 'onSelected' );

      dropdown._mountWidget();

      expect( dropdown.widget.items ).to.deep.equal( items );
      expect( dropdown.widget.selected ).to.equal( 1 );

      expect( libui.UiCombobox.prototype.onSelected ).to.have.been.calledOn( dropdown.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 1 );
        return true;
      } ) );
  } );
} );
