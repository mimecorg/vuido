<template>
  <Area v-on:draw="draw" v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:dragbroken="dragBroken"/>
</template>

<script>
import libui from 'libui-node'

export default {
  data() {
    return {
      highlighted: false
    };
  },
  methods: {
    draw( params ) {
      const context = params.getContext();
      const borderRect = this.makeRectanglePath( 0, 0, params.getAreaWidth(), params.getAreaHeight() );
      context.stroke( borderRect, this.makeSolidBrush( 0, 0, 0 ), this.makeStroke() );
      borderRect.freePath();
      const innerRect = this.makeRectanglePath( 10, 10, 50, 50 );
      const brush = this.highlighted ? this.makeSolidBrush( 1, 0, 0 ) : this.makeSolidBrush( 0, 0, 1 );
      context.fill( innerRect, brush );
      innerRect.freePath();
    },
    makeRectanglePath( x, y, width, height ) {
      const path = new libui.UiDrawPath( libui.fillMode.winding );
      path.addRectangle( x, y, width, height );
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
      if ( e.getDown() == 1 ) {
        this.highlighted = true;
        this.$el.redraw();
      }
    },
    mouseUp( e ) {
      if ( e.getUp() == 1 ) {
        this.highlighted = false;
        this.$el.redraw();
      }
    },
    dragBroken() {
      this.highlighted = false;
      this.$el.redraw();
    }
  }
}
</script>
