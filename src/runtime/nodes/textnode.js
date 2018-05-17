export class TextNode {
  constructor( text ) {
    this.parentNode = null;
    this.prevSibling = null;
    this.nextSibling = null;

    this.tagName = '';

    this.text = text;
  }

  setText( text ) {
    this.text = text;

    if ( this.parentNode != null )
      this.parentNode._setContentText( text );
  }
}
