const expect = require( 'chai' ).expect;

const libui = require( 'libui-node' );

const { TextNode, Text, Button } = require( 'libui-node-dom' );

describe( 'Text', () => {
  it( 'constructor', () => {
    const text = new Text( 'Text' );

    expect( text.parentNode ).to.be.null;
    expect( text.prevSibling ).to.be.null;
    expect( text.nextSibling ).to.be.null;
    expect( text.tagName ).to.equal( 'Text' );
    expect( text.childNodes ).to.be.an( 'array' ).that.is.empty;
    expect( text.attributes ).to.be.deep.equal( {
      visible: true,
      enabled: true,
      stretchy: false,
      label: ''
    } );
    expect( text.handlers ).to.be.an( 'object' ).that.is.empty;
    expect( text.widget ).to.be.null;
  } );

  it( '_mountWidget', () => {
    const text = new Text( 'Text' );

    text._mountWidget();

    expect( text.widget ).to.be.an.instanceof( libui.UiLabel );

    expect( text.widget.visible ).to.be.true;
    expect( text.widget.enabled ).to.be.true;
    expect( text.widget.text ).to.be.empty;
  } );

  it( '_mountWidget with child text node', () => {
    const text = new Text( 'Text' );
    const textNode = new TextNode( 'foo' );

    text.appendChild( textNode );

    text._mountWidget();

    expect( text.widget.text ).to.equal( 'foo' );
  } );

  it( '_mountWidget with child element fails', () => {
    const text = new Text( 'Text' );
    const child = new Button( 'Button' );

    text.appendChild( child );

    expect( () => text._mountWidget() ).to.throw();
  } );

  it( 'setText on child text node', () => {
    const text = new Text( 'Text' );
    const textNode = new TextNode( 'foo' );

    text.appendChild( textNode );

    text._mountWidget();

    textNode.setText( 'bar' );

    expect( text.widget.text ).to.equal( 'bar' );
  } );
} );
