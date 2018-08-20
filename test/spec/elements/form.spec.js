const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );

const { TextInput, Form } = require( 'libui-node-dom' );

describe( 'Form', () => {
  it( 'default', () => {
      const form = new Form( 'Form' );

      form._mountWidget();

      expect( form.widget ).to.be.an.instanceof( libui.UiForm );

      expect( form.widget.visible ).to.be.true;
      expect( form.widget.enabled ).to.be.true;
      expect( form.widget.padded ).to.be.false;
  } );

  it( 'with attribute and children', () => {
      const form = new Form( 'Form' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      form.setAttribute( 'padded', true );
      form.appendChild( child1 );
      form.appendChild( child2 );
      child1.setAttribute( 'label', 'foo' );
      child2.setAttribute( 'label', 'bar' );
      child2.setAttribute( 'stretchy', true );

      sinon.spy( libui.UiForm.prototype, 'append' );

      form._mountWidget();

      expect( form.widget.padded ).to.be.true;

      expect( libui.UiForm.prototype.append ).to.have.been.calledOn( form.widget ).and.calledWith( 'foo', child1.widget, false )
        .and.calledWith( 'bar', child2.widget, true );

      expect( form.widget.children ).to.deep.equal( [ child1.widget, child2.widget ] );
  } );

  it( 'appendChild', () => {
      const form = new Form( 'Form' );
      const child = new TextInput( 'TextInput' );

      form._mountWidget();

      sinon.spy( libui.UiForm.prototype, 'append' );

      child.setAttribute( 'label', 'foo' );
      form.appendChild( child );

      expect( libui.UiForm.prototype.append ).to.have.been.calledOn( form.widget ).and.calledWith( 'foo', child.widget, false );

      expect( form.widget.children ).to.deep.equal( [ child.widget ] );
  } );

  it( 'insertBefore', () => {
      const form = new Form( 'Form' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      child1.setAttribute( 'label', 'foo' );
      form.appendChild( child1 );

      form._mountWidget();

      child2.setAttribute( 'label', 'foo' );
      form.insertBefore( child2, child1 );

      expect( form.widget.children ).to.deep.equal( [ child2.widget, child1.widget ] );
  } );

  it( 'removeChild', () => {
      const form = new Form( 'Form' );
      const child1 = new TextInput( 'TextInput' );
      const child2 = new TextInput( 'TextInput' );

      child1.setAttribute( 'label', 'foo' );
      child2.setAttribute( 'label', 'bar' );
      form.appendChild( child1 );
      form.appendChild( child2 );

      form._mountWidget();

      form.removeChild( child1 );

      expect( form.widget.children ).to.deep.equal( [ child2.widget ] );
  } );
} );
