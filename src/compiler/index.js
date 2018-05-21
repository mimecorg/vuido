import { parseComponent } from 'sfc/parser'
import { createCompiler } from 'compiler/index'
import { genStaticKeys } from 'shared/util'

import { isUnaryTag, canBeLeftOpenTag, mustUseProp, isReservedTag, getTagNamespace } from '../util'

import directives from './directives'

const modules = [];

const baseOptions = {
  modules,
  directives,
  isUnaryTag,
  canBeLeftOpenTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace,
  preserveWhitespace: false,
  staticKeys: genStaticKeys( modules )
};

const { compile, compileToFunctions } = createCompiler( baseOptions );

export {
  parseComponent,
  compile,
  compileToFunctions
}
