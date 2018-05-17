import { TextNode } from './nodes/textnode'
import { Comment } from './nodes/comment'
import * as elements from './elements'

export function createElement( tagName, vnode ) {
  const element = elements[ tagName ];
  if ( element == null )
    throw new Error( 'Unknown element ' + tagName );
  return new element( tagName );
}

export function createElementNS( namespace, tagName ) {
  throw new Error( 'Namespaced elements are not supported' );
}

export function createTextNode( text ) {
  return new TextNode( text );
}

export function createComment( text ) {
  return new Comment( text );
}

export function appendChild( node, child ) {
  node.appendChild( child );
}

export function insertBefore( parentNode, newNode, referenceNode ) {
  parentNode.insertBefore( newNode, referenceNode );
}

export function removeChild( node, child ) {
  node.removeChild( child );
}

export function parentNode( node ) {
  return node.parentNode;
}

export function nextSibling( node ) {
  return node.nextSibling;
}

export function tagName( node ) {
  return node.tagName;
}

export function setTextContent( node, text ) {
  node.setText( text );
}

export function setAttribute( node, key, value ) {
  node.setAttribute( key, value );
}

export function setStyleScope( node, scopeId ) {
  throw new Error( 'Scoped styles are not supported' );
}
