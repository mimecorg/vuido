import { updateListeners } from 'core/vdom/helpers/update-listeners'

let target = null;

function add( event, handler, once, capture ) {
  if ( capture )
    throw new Error( 'Bubble phase events are not supported' );

  if ( once ) {
    const oldHandler = handler;
    const _target = target;

    handler = function( ev ) {
      const res = arguments.length === 1 ? oldHandler( ev ) : oldHandler.apply( null, arguments );
      if ( res !== null )
        remove( event, null, null, _target );
    }
  }

  target.addEventListener( event, handler );
}

function remove( event, handler, capture, _target ) {
  ( _target || target ).removeEventListener( event );
}

function updateDOMListeners( oldVnode, vnode ) {
  if ( oldVnode.data.on == null && vnode.data.on == null )
    return;

  const on = vnode.data.on || {};
  const oldOn = oldVnode.data.on || {};

  target = vnode.elm;
  updateListeners( on, oldOn, add, remove, vnode.context );
  target = null;
}

export default {
  create: updateDOMListeners,
  update: updateDOMListeners
}
