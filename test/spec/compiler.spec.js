const expect = require( 'chai' ).expect;

const { compile } = require( 'vuido-template-compiler' );

describe( 'compiler', () => {
  it( 'static example', () => {
    const result = compile( '<Window width="800" height="600" title="foo"><Text>bar</Text></Window>' );
    expect( result.render ).to.equal( `with(this){return _m(0)}` );
    expect( result.staticRenderFns[ 0 ] ).to.equal( `with(this){return _c('Window',{attrs:{"width":"800","height":"600","title":"foo"}},[_c('Text',[_v("bar")])])}` );
  } );

  it( 'ignore whitespace', () => {
    const result = compile( '<Window><Box><Button/> <Button/></Box></Window>' );
    expect( result.render ).to.equal( `with(this){return _m(0)}` );
    expect( result.staticRenderFns[ 0 ] ).to.equal( `with(this){return _c('Window',[_c('Box',[_c('Button'),_c('Button')])])}` );
  } );

  it( 'interpolated data', () => {
    const result = compile( '<Window v-bind:width="width" v-bind:height="width" v-bind:title="title"><Text>{{ label }}</Text></Window>' );
    expect( result.render ).to.equal( `with(this){return _c('Window',{attrs:{"width":width,"height":width,"title":title}},[_c('Text',[_v(_s(label))])])}` );
  } );

  it( 'v-on directive', () => {
    const result = compile( '<Window v-on:close="close"><Button v-on:click="click">foo</Button></Window>' );
    expect( result.render ).to.equal( `with(this){return _c('Window',{on:{"close":close}},[_c('Button',{on:{"click":click}},[_v("foo")])])}` );
  } );

  it( 'v-model directive', () => {
    const result1 = compile( '<Window><TextInput v-model="data"/></Window>' );
    expect( result1.render ).to.equal( `with(this){return _c('Window',[_c('TextInput',{attrs:{"value":(data)},on:{"input":function($event){data=$event}}})])}` );

    const result2 = compile( '<Window><Checkbox v-model="data"/></Window>' );
    expect( result2.render ).to.equal( `with(this){return _c('Window',[_c('Checkbox',{attrs:{"checked":(data)},on:{"toggle":function($event){data=$event}}})])}` );

    const result3 = compile( '<Window><DropdownList v-model="data"/></Window>' );
    expect( result3.render ).to.equal( `with(this){return _c('Window',[_c('DropdownList',{attrs:{"selected":(data)},on:{"change":function($event){data=$event}}})])}` );

    const result4 = compile( '<Window><CustomComponent v-model="data"/></Window>' );
    expect( result4.render ).to.equal( `with(this){return _c('Window',[_c('CustomComponent',{model:{value:(data),callback:function ($$v) {data=$$v},expression:"data"}})],1)}` );
  } );
} );
