const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { Spinbox } = require( 'libui-node-dom' );

describe( 'Spinbox', () => {
  it( 'default', () => {
      const spinbox = new Spinbox( 'Spinbox' );

      spinbox._mountWidget();

      expect( spinbox.widget ).to.be.an.instanceof( libui.UiSpinbox );

      expect( spinbox.widget.visible ).to.be.true;
      expect( spinbox.widget.enabled ).to.be.true;
      expect( spinbox.widget.value ).to.equal( 0 );
      expect( spinbox.widget.min ).to.equal( 0 );
      expect( spinbox.widget.max ).to.equal( 100 );
  } );

  it( 'with attributes and event listener', () => {
      const spinbox = new Spinbox( 'Spinbox' );
      const handler = sinon.stub();

      spinbox.setAttribute( 'value', 5 );
      spinbox.setAttribute( 'min', -10 );
      spinbox.setAttribute( 'max', 10 );
      spinbox.addEventListener( 'change', handler );

      sinon.spy( libui.UiSpinbox.prototype, 'onChanged' );

      spinbox._mountWidget();

      expect( spinbox.widget.value ).to.equal( 5 );
      expect( spinbox.widget.min ).to.equal( -10 );
      expect( spinbox.widget.max ).to.equal( 10 );

      expect( libui.UiSpinbox.prototype.onChanged ).to.have.been.calledOn( spinbox.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 5 );
        return true;
      } ) );
  } );
} );
