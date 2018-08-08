const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { Slider } = require( 'libui-node-dom' );

describe( 'Slider', () => {
  it( 'default', () => {
      const slider = new Slider( 'Slider' );

      slider._mountWidget();

      expect( slider.widget ).to.be.an.instanceof( libui.UiSlider );

      expect( slider.widget.visible ).to.be.true;
      expect( slider.widget.enabled ).to.be.true;
      expect( slider.widget.value ).to.equal( 0 );
      expect( slider.widget.min ).to.equal( 0 );
      expect( slider.widget.max ).to.equal( 100 );
  } );

  it( 'with attributes and event listener', () => {
      const slider = new Slider( 'Slider' );
      const handler = sinon.stub();

      slider.setAttribute( 'value', 5 );
      slider.setAttribute( 'min', -10 );
      slider.setAttribute( 'max', 10 );
      slider.addEventListener( 'change', handler );

      sinon.spy( libui.UiSlider.prototype, 'onChanged' );

      slider._mountWidget();

      expect( slider.widget.value ).to.equal( 5 );
      expect( slider.widget.min ).to.equal( -10 );
      expect( slider.widget.max ).to.equal( 10 );

      expect( libui.UiSlider.prototype.onChanged ).to.have.been.calledOn( slider.widget ).and.calledWith( sinon.match( callback => {
        callback();
        expect( handler ).to.have.been.calledWith( 5 );
        return true;
      } ) );
  } );
} );
