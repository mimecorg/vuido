const chai = require( 'chai' );
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const mock = require( 'mock-require' );

const libui = require( './mock/libui' );

chai.use( sinonChai );

afterEach( () => {
  sinon.restore();
} );

mock( 'libui-node', libui );
mock( 'libui-node-dom', '../packages/libui-node-dom' );
mock( 'vuido-template-compiler', '../packages/vuido-template-compiler' );
mock( 'vuido', '../dist/vuido' );
