const expect = require( 'chai' ).expect;

const { Comment } = require( 'libui-node-dom' );

describe( 'Comment', () => {
  it( 'constructor', () => {
    const node = new Comment( 'foo' );

    expect( node.parentNode ).to.be.null;
    expect( node.prevSibling ).to.be.null;
    expect( node.nextSibling ).to.be.null;
    expect( node.tagName ).to.be.empty;
    expect( node.text ).to.equal( 'foo' );
  } );

  it( 'setText', () => {
    const node = new Comment( 'foo' );

    node.setText( 'bar' );

    expect( node.text ).to.equal( 'bar' );
  } );
} );
