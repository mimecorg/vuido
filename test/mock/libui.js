const libui = {};

libui.UiWindow = class {
  constructor( title, width, height, menu ) {
    this.title = title;
    this.contentSize = new libui.Size( width, height );
    this.menu = menu;
    this.margined = false;
    this.fullscreen = false;
    this.borderless = false;
  }

  setChild( child ) {
  }

  show() {
  }

  close() {
  }

  onClosing( handler ) {
  }

  onContentSizeChanged( handler ) {
  }
};

libui.UiControl = class {
  constructor() {
    this.visible = true;
    this.enabled = true;
  }

  destroy() {
  }
};

libui.UiBox = class extends libui.UiControl {
  constructor() {
    super();
    this.padded = false;
    this.children = [];
  }

  append( control, stretchy ) {
    this.children.push( control );
  }

  deleteAt( index ) {
    if ( index < 0 || index >= this.children.length )
      throw new RangeError( 'Invalid control index' );
    this.children.splice( index, 1 );
  }
};

libui.UiHorizontalBox = class extends libui.UiBox {
};

libui.UiVerticalBox = class extends libui.UiBox {
};

libui.UiButton = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
  }

  onClicked( handler ) {
  }
};

libui.UiLabel = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
  }
};

libui.UiEntry = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
  }
};

libui.UiArea = class extends libui.UiControl {
  constructor( drawCb, mouseEventCb, mouseCrossedCb, dragBrokenCb, keyEventCb, width, heigth ) {
    super();
  }

  setSize( width, height ) {
  }

  queueRedrawAll() {
  }
};

libui.Size = class {
  constructor( width, height ) {
    this.w = width;
    this.h = height;
  }
};

libui.DrawStrokeParams = class {
  constructor() {
    this.thickness = 0;
  }
};

module.exports = libui;
