const libui = {};

libui.UiWindow = class {
  constructor( title, width, height, menu ) {
    this.title = title;
    this.width = width;
    this.height = height;
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
};

libui.UiControl = class {
  constructor() {
    this.visible = true;
    this.enabled = true;
  }
};

libui.UiBox = class extends libui.UiControl {
};

libui.UiText = class extends libui.UiControl {
};

libui.UiButton = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
  }

  onClicked( handler ) {
  }
};

module.exports = libui;
