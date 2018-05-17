import Vue from 'core/instance/index'
import { initGlobalAPI } from 'core/global-api/index'
import { mountComponent } from 'core/instance/lifecycle'

import { patch } from './patch'

import { mustUseProp, isReservedTag, getTagNamespace, isUnknownElement } from '../util'

initGlobalAPI( Vue );

Vue.version = __VUE_VERSION__;

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

Vue.prototype.__patch__ = patch;

Vue.prototype.$mount = function( el, hydrating ) {
  if ( el != null )
    throw new Error( 'Mount element is not supported' );

  mountComponent( this, el, hydrating );

  if ( this.$parent == null && this.$el.widget == null ) {
    if ( this.$el.tagName != 'Window' )
      throw new Error( 'Top level element must be a Window' );

    this.$el._mountWindow();

    this.$on( 'hook:destroyed', () => {
      this.$el._destroyWindow();
    } );
  }

  return this;
};

export default Vue
