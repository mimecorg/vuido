import libui from 'libui-node'
import Vue from 'vuido'

import MainWindow from './components/MainWindow'

const window = new Vue( {
  render( h ) {
    return h( MainWindow );
  }
} );

window.$mount();

libui.startLoop();
