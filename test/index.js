const chai = require( 'chai' );
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const sinonChaiInOrder = require( 'sinon-chai-in-order' ).default;
const mock = require( 'mock-require' );

const libui = require( './mock/libui' );

chai.use( sinonChai );
chai.use( sinonChaiInOrder );

afterEach( () => {
  sinon.restore();
} );

mock( 'libui-node', libui );
mock( 'libui-node-dom', '../packages/libui-node-dom' );
