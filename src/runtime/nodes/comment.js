export class Comment {
  constructor( text ) {
    this.parentNode = null;
    this.prevSibling = null;
    this.nextSibling = null;

    this.tagName = '';

    this.text = text;
  }

  setText( text ) {
    this.text = text;
  }
}
