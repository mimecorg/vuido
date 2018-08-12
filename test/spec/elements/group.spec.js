const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextInput, Group } = require( 'libui-node-dom' );

describe( 'Group', () => {
  it( 'default', () => {
      const group = new Group( 'Group' );

      group._mountWidget();

      expect( group.widget ).to.be.an.instanceof( libui.UiGroup );

      expect( group.widget.visible ).to.be.true;
      expect( group.widget.enabled ).to.be.true;
      expect( group.widget.title ).to.be.empty;
      expect( group.widget.margined ).to.be.false;
  } );

  it( 'with attributes and child', () => {
      const group = new Group( 'Group' );
      const child = new TextInput( 'TextInput' );

      group.setAttribute( 'title', 'foo' );
      group.setAttribute( 'margined', true );
      group.appendChild( child );

      sinon.spy( libui.UiGroup.prototype, 'setChild' );

      group._mountWidget();

      expect( group.widget.title ).to.equal( 'foo' );
      expect( group.widget.margined ).to.be.true;

      expect( libui.UiGroup.prototype.setChild ).to.have.been.calledOn( group.widget ).and.calledWith( child.widget );
  } );

  it( 'with two children fails', () => {
      const group = new Group( 'Group' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      group.appendChild( child1 );

      expect( () => group.appendChild( child2 ) ).to.throw();
  } );
} );
