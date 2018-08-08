const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { RadioButtons } = require( 'libui-node-dom' );

describe( 'RadioButtons', () => {
  it( 'without items fails', () => {
      const radio = new RadioButtons( 'RadioButtons' );

      expect( () => radio._mountWidget() ).to.throw();
  } );

  it( 'with items and event listener', () => {
      const radio = new RadioButtons( 'RadioButtons' );
      const handler = sinon.stub();

      const items = [ 'item1', 'item2', 'item3' ];

      radio.setAttribute( 'items', items );
      radio.setAttribute( 'selected', 1 );
      radio.addEventListener( 'change', handler );

      sinon.spy( libui.UiRadioButtons.prototype, 'onSelected' );

      radio._mountWidget();

      expect( radio.widget.items ).to.deep.equal( items );
      expect( radio.widget.selected ).to.equal( 1 );

      expect( libui.UiRadioButtons.prototype.onSelected ).to.have.been.calledOn( radio.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 1 );
        return true;
      } ) );
  } );
} );
