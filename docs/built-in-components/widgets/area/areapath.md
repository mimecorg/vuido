# AreaPath

A stroked and/or filled path.

## Attributes

### path

type: [libui.UiDrawPath](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uidrawpath)

The path to be stroked and/or filled.

### fill

type: [libui.DrawBrush](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawbrush)

The fill brush. By default it is inherited by the parent [AreaGroup](areagroup.md). If not specified, the path is not filled.

### stroke

type: [libui.DrawBrush](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawbrush)

The stroke brush. By default it is inherited by the parent [AreaGroup](areagroup.md). If not specified, the path is not stroked.

### line

type: [libui.DrawStrokeParams](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawstrokeparams)

The style of line for the stroke. By default it is inherited by the parent [AreaGroup](areagroup.md). If not specified, a solid one-pixel line is used.

## Example

```markup
<template>
  <Area>
    <AreaPath v-bind:path="circlePath" v-bind:fill="redBrush"/>
  </Area>
</template>

<script>
import libui from 'libui-node'

export default {
  computed: {
    cicrlePath() {
      const path = new libui.UiDrawPath( libui.fillMode.winding );
      path.newFigureWithArc( 100, 100, 50, 0, Math.PI * 2, false );
      path.end();
      return path;
    },
    redBrush() {
      const brush = new libui.DrawBrush();
      brush.color = new libui.Color( 1, 0, 0, 1 );
      brush.type = libui.brushType.solid;
      return brush;
    }
  }
}
</script>
```

