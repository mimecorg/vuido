<template>
  <Area v-on:draw="drawBorder" v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:dragbroken="dragBroken">
    <AreaGroup v-bind:fill="innerBrush">
      <AreaPath v-bind:path="innerRect"/>
      <AreaPath v-bind:path="innerCircle" v-bind:stroke="blackBrush"/>
    </AreaGroup>
    <AreaText x="20" y="20" v-bind:layout="textLayout"/>
  </Area>
</template>

<script>
import libui from 'libui-node'

export default {
  data() {
    return {
      highlighted: false
    };
  },
  computed: {
    innerRect() {
      return this.makeRectanglePath( 10, 10, 50, 50 );
    },
    innerCircle() {
      return this.makeCirclePath( 95, 35, 25 );
    },
    innerBrush() {
      return this.highlighted ? this.makeSolidBrush( 1, 0, 0 ) : this.makeSolidBrush( 0, 0, 1 );
    },
    blackBrush() {
      return this.makeSolidBrush( 0, 0, 0 );
    },
    textLayout() {
      const string = new libui.AttributedString( 'This is a ' );
      string.appendAttributed( 'test', libui.FontAttribute.newWeight( libui.textWeight.bold ) );
      const font = new libui.FontDescriptor( 'Arial', 12, libui.textWeight.normal, libui.textItalic.normal, libui.textStretch.normal );
      return new libui.DrawTextLayout( string, font, 300, libui.textAlign.left );
    }
  },
  methods: {
    drawBorder( params ) {
      const context = params.getContext();
      const borderRect = this.makeRectanglePath( 0, 0, params.getAreaWidth(), params.getAreaHeight() );
      context.stroke( borderRect, this.makeSolidBrush( 0, 0, 0 ), this.makeStroke() );
      borderRect.freePath();
    },
    makeRectanglePath( x, y, width, height ) {
      const path = new libui.UiDrawPath( libui.fillMode.winding );
      path.addRectangle( x, y, width, height );
      path.end();
      return path;
    },
    makeCirclePath( x, y, radius ) {
      const path = new libui.UiDrawPath( libui.fillMode.winding );
      path.newFigureWithArc( x, y, radius, 0, Math.PI * 2, false );
      path.end();
      return path;
    },
    makeSolidBrush( r, g, b ) {
      const brush = new libui.DrawBrush();
      brush.color = new libui.Color( r, g, b, 1 );
      brush.type = libui.brushType.solid;
      return brush;
    },
    makeStroke() {
      const stroke = new libui.DrawStrokeParams();
      stroke.thickness = 1;
      return stroke;
    },
    mouseDown( e ) {
      if ( e.getDown() == 1 )
        this.highlighted = true;
    },
    mouseUp( e ) {
      if ( e.getUp() == 1 )
        this.highlighted = false;
    },
    dragBroken() {
      this.highlighted = false;
    }
  }
}
</script>
