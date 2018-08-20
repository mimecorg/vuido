const expect = require( 'chai' ).expect;

const libui = require( 'libui-node' );

const { ProgressBar } = require( 'libui-node-dom' );

describe( 'ProgressBar', () => {
  it( 'default', () => {
      const progress = new ProgressBar( 'ProgressBar' );

      progress._mountWidget();

      expect( progress.widget ).to.be.an.instanceof( libui.UiProgressBar );

      expect( progress.widget.visible ).to.be.true;
      expect( progress.widget.enabled ).to.be.true;
      expect( progress.widget.value ).to.equal( 0 );
  } );

  it( 'with value', () => {
      const progress = new ProgressBar( 'ProgressBar' );

      progress.setAttribute( 'value', 50 );

      progress._mountWidget();

      expect( progress.widget.value ).to.equal( 50 );
  } );
} );
