import { makeMap } from 'shared/util'

export function isUnaryTag( el ) {
  return false;
}

export function canBeLeftOpenTag( el ) {
  return false;
}

export function mustUseProp( tag, type, name ) {
  return false;
}

export const isReservedTag = makeMap( 'template,script,style,box,button,checkbox,colorbutton,combobox,datepicker,datetimepicker,dropdownlist,'
  + 'fontbutton,group,progressbar,radiobuttons,separator,slider,tab,text,textarea,textinput,timepicker,window', true );

export function getTagNamespace( tag ) {
}

export function isUnknownElement( tag ) {
  return false;
}

export const isBooleanAttr = makeMap( 'visible,enabled,stretchy,margined,padded,checked,horizontal,readonly' );
