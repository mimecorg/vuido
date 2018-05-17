import { extend } from 'shared/util'
import { isBooleanAttr } from '../../util'

function updateAttrs( oldVnode, vnode ) {
  if ( oldVnode.data.attrs == null && vnode.data.attrs == null )
    return;

  const elm = vnode.elm;
  const oldAttrs = oldVnode.data.attrs || {};
  let attrs = vnode.data.attrs || {};

  if ( attrs.__ob__ != null )
    attrs = vnode.data.attrs = extend( {}, attrs );

  for ( let key in attrs ) {
    let cur = attrs[ key ];
    let old = oldAttrs[ key ];
    if ( old !== cur )
      setAttr( elm, key, cur );
  }

  for ( let key in oldAttrs ) {
    if ( attrs[ key ] == null )
      elm.setAttribute( key, null );
  }
}

function setAttr( elm, key, value ) {
  if ( isBooleanAttr( key ) ) {
    if ( value == null || value === false )
      elm.setAttribute( key, false );
    else
      elm.setAttribute( key, true );
  } else {
    elm.setAttribute( key, value );
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
