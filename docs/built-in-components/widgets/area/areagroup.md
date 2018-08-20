# AreaGroup

A group containing other components, including nested groups, AreaPath and AreaText components. It can define a transformation and a default fill and stroke brush for its children.

## Attributes

### transform

type: [libui.UiDrawMatrix](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uidrawmatrix)

A transformation applied to child components.

### fill

type: [libui.DrawBrush](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawbrush)

The default fill brush for child components.

### stroke

type: [libui.DrawBrush](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawbrush)

The default stroke brush for child components.

### line

type: [libui.DrawStrokeParams](https://github.com/parro-it/libui-node/blob/master/docs/area.md#drawstrokeparams)

The default style of line for child components.

## Example

```markup
<Area>
  <AreaGroup v-bind:fill="redBrush"/>
    <AreaPath v-bind:path="circlePath"/>
    <AreaPath v-bind:path="squarePath"/>
  </AreaGroup>    
</Area>
```

