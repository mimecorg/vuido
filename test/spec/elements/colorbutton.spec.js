const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { ColorButton } = require( 'libui-node-dom' );

describe( 'ColorButton', () => {
  it( 'default', () => {
      const button = new ColorButton( 'ColorButton' );

      button._mountWidget();

      expect( button.widget ).to.be.an.instanceof( libui.UiColorButton );

      expect( button.widget.visible ).to.be.true;
      expect( button.widget.enabled ).to.be.true;
      expect( button.widget.color ).to.deep.equal( new libui.Color( 0, 0, 0, 1 ) );
  } );

  it( 'with value and event listener', () => {
      const button = new ColorButton( 'ColorButton' );
      const handler = sinon.stub();

      const color = new libui.Color( 1, 0, 1, 1 );

      button.setAttribute( 'value', color );
      button.addEventListener( 'change', handler );

      sinon.spy( libui.UiColorButton.prototype, 'onChanged' );

      button._mountWidget();

      expect( button.widget.color ).to.equal( color );

      expect( libui.UiColorButton.prototype.onChanged ).to.have.been.calledOn( button.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( color );
        return true;
      } ) );
  } );
} );
