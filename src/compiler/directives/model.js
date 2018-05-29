import { addHandler, addAttr } from 'compiler/helpers'
import { genComponentModel, genAssignmentCode } from 'compiler/directives/model'

import { isReservedTag } from '../../util'

export default function model( el, dir, _warn ) {
  if ( el.component != null || !isReservedTag( el.tag ) )
    genComponentModel( el, dir.value, dir.modifiers );
  else if ( el.tag == 'TextInput' || el.tag == 'TextArea' || el.tag == 'Combobox' )
    genDefaultModel( el, dir.value, dir.modifiers, 'value', 'input' );
  else if ( el.tag == 'ColorButton' || el.tag == 'Slider' )
    genDefaultModel( el, dir.value, dir.modifiers, 'value', 'change' );
  else if ( el.tag == 'Checkbox' )
    genDefaultModel( el, dir.value, dir.modifiers, 'checked', 'toggle' );
  else if ( el.tag == 'RadioButtons' || el.tag == 'DropdownList' )
    genDefaultModel( el, dir.value, dir.modifiers, 'selected', 'change' );
  else if ( process.env.NODE_ENV != 'production' )
    _warn( el.tag + ' does not support v-model' );
}

function genDefaultModel( el, value, modifiers, attr, event ) {
  const { trim, number } = modifiers || {};

  let valueExpression = '$event';
  if ( trim )
    valueExpression += '.trim()';
  if ( number )
    valueExpression = '_n(' + valueExpression + ')';

  const code = genAssignmentCode( value, valueExpression );

  addAttr( el, attr, '(' + value + ')' );
  addHandler( el, event, code, null, true );
}
