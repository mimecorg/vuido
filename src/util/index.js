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

export const isReservedTag = makeMap( 'template,script,style,box,group,button,colorbutton,fontbutton,text,textarea,textinput,checkbox,datepicker,timepicker,datetimepicker,progressbar,radiobuttons,separator,window', true );

export function getTagNamespace( tag ) {
}

export function isUnknownElement( tag ) {
  return false;
}

export const isBooleanAttr = makeMap( 'visible,enabled,stretchy,margined,padded,checked,horizontal,vertical,readonly' );
