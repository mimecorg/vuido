import { addHandler, addAttr } from 'compiler/helpers'
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model'

import { isReservedTag } from '../../util'

export default function model( el, dir, _warn ) {
  if ( el.component != null || !isReservedTag( el.tag ) )
    genComponentModel( el, dir.value, dir.modifiers );
  else if ( el.tag == 'TextInput' )
    genDefaultModel( el, dir.value, dir.modifiers );
  else if ( process.env.NODE_ENV != 'production' )
    _warn( el.tag + ' does not support v-model' );
}

function genDefaultModel( el, value, modifiers ) {
  const { trim, number } = modifiers || {};

  let valueExpression = '$event';
  if ( trim )
    valueExpression += '.trim()';
  if ( number )
    valueExpression = '_n(' + valueExpression + ')';

  const code = genAssignmentCode( value, valueExpression );

  addAttr( el, 'value', '(' + value + ')' );
  addHandler( el, 'input', code, null, true );
}
