const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const { Comment, TextNode, Element } = require( 'libui-node-dom' );

describe( 'elements', () => {
  describe( 'basic', () => {
    it( 'constructor', () => {
      const elmement = new Element( 'foo' );

      expect( elmement.parentNode ).to.be.null;
      expect( elmement.prevSibling ).to.be.null;
      expect( elmement.nextSibling ).to.be.null;
      expect( elmement.tagName ).to.equal( 'foo' );
      expect( elmement.childNodes ).to.be.an( 'array' ).that.is.empty;
      expect( elmement.attributes ).to.be.an( 'object' ).that.is.empty;
      expect( elmement.handlers ).to.be.an( 'object' ).that.is.empty;
    } );

    it( 'setAttribute', () => {
      const element = new Element( 'foo' );

      element.setAttribute( 'bar', 'value' );

      expect( element.attributes.bar ).to.equal( 'value' );
    } );

    it( 'addEventListener', () => {
      const element = new Element( 'foo' );
      const handler = sinon.stub();

      element.addEventListener( 'bar', handler );

      expect( element.handlers.bar ).to.equal( handler );
    } );

    it( 'removeEventListener', () => {
      const element = new Element( 'foo' );
      const handler = sinon.stub();

      element.addEventListener( 'bar', handler );

      element.removeEventListener( 'bar' );

      expect( element.handlers.bar ).to.be.undefined;
    } );
  } );

  describe( 'children', () => {
    it( 'appendChild element', () => {
      const parent = new Element( 'parent' );
      const child = new Element( 'child' );

      parent.appendChild( child );

      expect( parent.childNodes ).to.deep.equal( [ child ] );

      expect( child.parentNode ).to.equal( parent );
      expect( child.prevSibling ).to.be.null;
      expect( child.nextSibling ).to.be.null;
    } );

    it( 'appendChild text node', () => {
      const parent = new Element( 'parent' );
      const child = new TextNode( 'child' );

      parent.appendChild( child );

      expect( parent.childNodes ).to.deep.equal( [ child ] );

      expect( child.parentNode ).to.equal( parent );
      expect( child.prevSibling ).to.be.null;
      expect( child.nextSibling ).to.be.null;
    } );

    it( 'appendChild comment', () => {
      const parent = new Element( 'parent' );
      const child = new Comment( 'child' );

      parent.appendChild( child );

      expect( parent.childNodes ).to.deep.equal( [ child ] );

      expect( child.parentNode ).to.equal( parent );
      expect( child.prevSibling ).to.be.null;
      expect( child.nextSibling ).to.be.null;
    } );

    it( 'appendChild with two text nodes fails', () => {
      const parent = new Element( 'parent' );
      const child1 = new TextNode( 'child1' );
      const child2 = new TextNode( 'child2' );

      parent.appendChild( child1 );

      expect( () => parent.appendChild( child2 ) ).to.throw();
    } );

    function expectChildren( parent, childNodes ) {
      expect( parent.childNodes ).to.deep.equal( childNodes );

      for ( let i = 0; i < childNodes.length; i++ ) {
        expect( childNodes[ i ].parentNode ).to.equal( parent );
        if ( i == 0 )
          expect( childNodes[ i ].prevSibling ).to.be.null;
        else
          expect( childNodes[ i ].prevSibling ).to.equal( childNodes[ i - 1 ] );
        if ( i < childNodes.length - 1 )
          expect( childNodes[ i ].nextSibling ).to.equal( childNodes[ i + 1 ] );
        else
          expect( childNodes[ i ].nextSibling ).to.be.null;
      }
    }

    it( 'appendChild multiple children', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      expectChildren( parent, [ child1, child2, child3 ] );
    } );

    it( 'insertBefore at the start', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );

      parent.insertBefore( child3, child1 );

      expectChildren( parent, [ child3, child1, child2 ] );
    } );

    it( 'insertBefore at the end', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );

      parent.insertBefore( child3, null );

      expectChildren( parent, [ child1, child2, child3 ] );
    } );

    it( 'insertBefore in the middle', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );

      parent.insertBefore( child3, child2 );

      expectChildren( parent, [ child1, child3, child2 ] );
    } );

    it( 'insertBefore move to the start', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      parent.insertBefore( child2, child1 );

      expectChildren( parent, [ child2, child1, child3 ] );
    } );

    it( 'insertBefore move to the end', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      parent.insertBefore( child2, null );

      expectChildren( parent, [ child1, child3, child2 ] );
    } );

    it( 'insertBefore move left', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );
      const child4 = new Element( 'child4' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );
      parent.appendChild( child4 );

      parent.insertBefore( child3, child2 );

      expectChildren( parent, [ child1, child3, child2, child4 ] );
    } );

    it( 'insertBefore move right', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );
      const child4 = new Element( 'child4' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );
      parent.appendChild( child4 );

      parent.insertBefore( child2, child4 );

      expectChildren( parent, [ child1, child3, child2, child4 ] );
    } );

    it( 'removeChild from the start', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      parent.removeChild( child1 );

      expectChildren( parent, [ child2, child3 ] );
    } );

    it( 'removeChild from the end', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      parent.removeChild( child3 );

      expectChildren( parent, [ child1, child2 ] );
    } );

    it( 'removeChild from the middle', () => {
      const parent = new Element( 'parent' );
      const child1 = new Element( 'child1' );
      const child2 = new Comment( 'child2' );
      const child3 = new Element( 'child3' );

      parent.appendChild( child1 );
      parent.appendChild( child2 );
      parent.appendChild( child3 );

      parent.removeChild( child2 );

      expectChildren( parent, [ child1, child3 ] );
    } );
  } );
} );
