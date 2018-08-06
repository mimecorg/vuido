const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );

const libui = require( 'libui-node' );
const Vue = require( 'vuido' );

describe( 'runtime', () => {
  it( 'mount a window component', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } } );
      }
    } );

    sinon.spy( libui.UiWindow.prototype, 'show' );

    vm.$mount();

    expect( vm.$el ).to.be.an( 'object' );
    expect( vm.$el.window ).to.be.an.instanceof( libui.UiWindow );
    expect( vm.$el.window.title ).to.equal( 'foo' );

    expect( libui.UiWindow.prototype.show ).to.have.been.calledOn( vm.$el.window );
  } );

  it( 'mount a non-window component fails', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Box' );
      }
    } );

    expect( () => vm.$mount() ).to.throw();
  } );

  it( 'component with child widgets', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } }, [
          h( 'Box', { ref: 'box' }, [
            h( 'Text', { ref: 'text' }, 'bar' )
          ] )
        ] );
      }
    } );

    vm.$mount();

    expect( vm.$refs.box ).to.be.an( 'object' );
    expect( vm.$refs.box.widget ).to.be.an.instanceof( libui.UiVerticalBox );

    expect( vm.$refs.text ).to.be.an( 'object' );
    expect( vm.$refs.text.widget ).to.be.an.instanceof( libui.UiLabel );
    expect( vm.$refs.text.widget.text ).to.equal( 'bar' );
  } );

  it( 'component with interpolated data', done => {
    const vm = new Vue( {
      data: {
        title: '',
        label: ''
      },
      render( h ) {
        return h( 'Window', { attrs: { title: this.title } }, [
          h( 'Text', { ref: 'text' }, this.label )
        ] );
      }
    } );

    vm.$mount();

    vm.title = 'foo';
    vm.label = 'bar';

    vm.$nextTick( () => {
      expect( vm.$el.window.title ).to.equal( 'foo' );
      expect( vm.$refs.text.widget.text ).to.equal( 'bar' );
      done();
    } );
  } );

  it( 'component with boolean attributes', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo', margined: '', borderless: '' } }, [
          h( 'Box', { ref: 'box', attrs: { horizontal: '', padded: '' } }, [
            h( 'Text', { ref: 'text', attrs: { stretchy: '' } }, 'bar' )
          ] )
        ] );
      }
    } );

    vm.$mount();

    expect( vm.$el.window.margined ).to.be.true;
    expect( vm.$el.window.borderless ).to.be.true;
    expect( vm.$refs.box.widget ).to.be.an.instanceof( libui.UiHorizontalBox );
    expect( vm.$refs.box.widget.padded ).to.be.true;
    expect( vm.$refs.text.attributes.stretchy ).to.be.true;
  } );

  it( 'component with an event handler', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } }, [
          h( 'Button', { ref: 'button', on: { click: this.click } }, 'bar' )
        ] );
      },
      methods: {
        click() {
        }
      }
    } );

    sinon.spy( libui.UiButton.prototype, 'onClicked' );
    sinon.spy( vm, 'click' );

    vm.$mount();

    expect( libui.UiButton.prototype.onClicked ).to.have.been.calledOn( vm.$refs.button.widget ).and.calledWith( sinon.match( handler => {
      handler();
      expect( vm.click ).to.have.been.called;
      return true;
    } ) );
  } );

  it( 'conditional rendering', done => {
    const vm = new Vue( {
      data: {
        input: false
      },
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } }, [
          h( 'Box', { ref: 'box' }, [
            this.input ? h( 'TextInput', { ref: 'input' } ) : h( 'Text', { ref: 'text' }, 'foo' )
          ] )
        ] );
      }
    } );

    vm.$mount();

    expect( vm.$refs.input ).to.be.undefined;
    expect( vm.$refs.text ).to.be.an( 'object' );
    expect( vm.$refs.text.widget ).to.be.an.instanceof( libui.UiLabel );
    expect( vm.$refs.box.widget.children ).to.deep.equal( [ vm.$refs.text.widget ] );

    vm.input = true;

    vm.$nextTick( () => {
      expect( vm.$refs.text ).to.be.undefined;
      expect( vm.$refs.input ).to.be.an( 'object' );
      expect( vm.$refs.input.widget ).to.be.an.instanceof( libui.UiEntry );
      expect( vm.$refs.box.widget.children ).to.deep.equal( [ vm.$refs.input.widget ] );
      done();
    } );
  } );

  it( 'custom component', () => {
    const CustomText = Vue.extend( {
      props: {
        label: String
      },
      render( h ) {
        return h( 'Text', { ref: 'text' }, this.label )
      }
    } );

    const vm = new Vue( {
      components: {
        CustomText
      },
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } }, [
          h( 'CustomText', { ref: 'child', props: { label: 'foo' } } )
        ] );
      }
    } );

    vm.$mount();

    expect( vm.$refs.child.$refs.text ).to.be.an( 'object' );
    expect( vm.$refs.child.$refs.text.widget ).to.be.an.instanceof( libui.UiLabel );
    expect( vm.$refs.child.$refs.text.widget.text ).to.equal( 'foo' );
  } );

  it( 'destroy a window', () => {
    const vm = new Vue( {
      render( h ) {
        return h( 'Window', { attrs: { title: 'foo' } } );
      }
    } );

    vm.$mount();

    sinon.spy( libui.UiWindow.prototype, 'close' );

    const window = vm.$el.window;

    vm.$destroy();

    expect( vm.$el.window ).to.be.null;

    expect( libui.UiWindow.prototype.close ).to.have.been.calledOn( window );
  } );
} );
