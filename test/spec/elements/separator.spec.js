const expect = require( 'chai' ).expect;

const libui = require( 'libui-node' );

const { Separator } = require( 'libui-node-dom' );

describe( 'Separator', () => {
  it( 'default', () => {
      const separator = new Separator( 'Separator' );

      separator._mountWidget();

      expect( separator.widget ).to.be.an.instanceof( libui.UiVerticalSeparator );

      expect( separator.widget.visible ).to.be.true;
      expect( separator.widget.enabled ).to.be.true;
  } );

  it( 'horizontal', () => {
      const separator = new Separator( 'Separator' );

      separator.setAttribute( 'horizontal', true );

      separator._mountWidget();

      expect( separator.widget ).to.be.an.instanceof( libui.UiHorizontalSeparator );
  } );
} );
