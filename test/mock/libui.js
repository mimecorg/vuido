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

libui.UiBox = class {
};

libui.UiText = class {
};

module.exports = libui;
