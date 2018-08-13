import Vue from 'vuido'

import MainWindow from './MainWindow'

const window = new Vue( {
  render( h ) {
    return h( MainWindow );
  }
} );

window.$start();
