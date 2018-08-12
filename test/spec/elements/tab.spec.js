const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextInput, Tab } = require( 'libui-node-dom' );

describe( 'Tab', () => {
  it( 'default', () => {
      const tab = new Tab( 'Tab' );

      tab._mountWidget();

      expect( tab.widget ).to.be.an.instanceof( libui.UiTab );

      expect( tab.widget.visible ).to.be.true;
      expect( tab.widget.enabled ).to.be.true;
  } );

  it( 'with children', () => {
      const tab = new Tab( 'Tab' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      tab.appendChild( child1 );
      tab.appendChild( child2 );
      child1.setAttribute( 'label', 'foo' );
      child2.setAttribute( 'label', 'bar' );

      sinon.spy( libui.UiTab.prototype, 'append' );

      tab._mountWidget();

      expect( libui.UiTab.prototype.append ).to.have.been.calledOn( tab.widget ).and.calledWith( 'foo', child1.widget )
        .and.subsequently.calledOn( tab.widget ).and.calledWith( 'bar', child2.widget );

      expect( tab.widget.children ).to.deep.equal( [ child1.widget, child2.widget ] );
  } );

  it( 'with margin', () => {
      const tab = new Tab( 'Tab' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      tab.setAttribute( 'margined', true );
      tab.appendChild( child1 );
      tab.appendChild( child2 );
      child1.setAttribute( 'label', 'foo' );
      child2.setAttribute( 'label', 'bar' );

      sinon.spy( libui.UiTab.prototype, 'setMargined' );

      tab._mountWidget();

      expect( libui.UiTab.prototype.setMargined ).to.have.been.calledOn( tab.widget ).and.calledWith( 0, true )
        .and.subsequently.calledOn( tab.widget ).and.calledWith( 1, true );
  } );

  it( 'appendChild', () => {
      const tab = new Tab( 'Tab' );
      const child = new TextInput( 'TextInput' );

      tab._mountWidget();

      sinon.spy( libui.UiTab.prototype, 'append' );

      child.setAttribute( 'label', 'foo' );
      tab.appendChild( child );

      expect( libui.UiTab.prototype.append ).to.have.been.calledOn( tab.widget ).and.calledWith( 'foo', child.widget );

      expect( tab.widget.children ).to.deep.equal( [ child.widget ] );
  } );

  it( 'insertBefore', () => {
      const tab = new Tab( 'Tab' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      child1.setAttribute( 'label', 'foo' );
      tab.appendChild( child1 );

      tab._mountWidget();

      child2.setAttribute( 'label', 'foo' );
      tab.insertBefore( child2, child1 );

      expect( tab.widget.children ).to.deep.equal( [ child2.widget, child1.widget ] );
  } );

  it( 'removeChild', () => {
      const tab = new Tab( 'Tab' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      child1.setAttribute( 'label', 'foo' );
      child2.setAttribute( 'label', 'bar' );
      tab.appendChild( child1 );
      tab.appendChild( child2 );

      tab._mountWidget();

      tab.removeChild( child1 );

      expect( tab.widget.children ).to.deep.equal( [ child2.widget ] );
  } );
} );
