const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const { Comment, TextNode, Element } = require( 'libui-node-dom' );

describe( 'nodes', () => {
  describe( 'TextNode' , () => {
    it( 'constructor', () => {
      const node = new TextNode( 'foo' );

      expect( node.parentNode ).to.be.null;
      expect( node.prevSibling ).to.be.null;
      expect( node.nextSibling ).to.be.null;
      expect( node.tagName ).to.be.empty;
      expect( node.text ).to.equal( 'foo' );
    } );

    it( 'setText', () => {
      const node = new TextNode( 'foo' );

      node.setText( 'bar' );

      expect( node.text ).to.equal( 'bar' );
    } );

    it( 'setText with parent element', () => {
      const node = new TextNode( 'foo' );

      const parent = new Element( 'parent' );
      parent.appendChild( node );

      sinon.stub( parent, '_setContentText' );

      node.setText( 'bar' );

      expect( parent._setContentText ).to.have.been.calledWith( 'bar' );
    } );
  } );

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
} );
