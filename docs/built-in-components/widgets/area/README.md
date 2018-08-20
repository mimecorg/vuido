# Area

A custom drawn widget which provides an API for drawing 2D graphics. It can have scroll bars and it can handle mouse and keyboard input.

The area widget can contain the following child components:

* [AreaGroup](areagroup.md) - a group containing other components
* [AreaPath](areapath.md) - a stroked and/or filled path
* [AreaText](areatext.md) - a paragraph of text with formatting

## Attributes

### scrollable

type: Boolean

Whether the area has a horizontal and vertical scrollbar.

### width

type: Number

The width of the scrollable area.

### height

type: Number

The height of the scrollable area.

## Events

### draw

Emitted when the widget needs to be redrawn. The argument of this event is a [libui.UiAreaDrawParams](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareadrawparams) object. You can retrieve the drawing context by calling `params.getContext()`.

### mousedown

Emitted when a mouse button is pressed over the widget. The argument of this event is a [libui.UiAreaMouseEvent](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareamouseevent) object.

### mouseup

Emitted when a mouse button is released. The argument of this event is a [libui.UiAreaMouseEvent](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareamouseevent) object.

### mousemove

Emitted when the mouse pointer moves over the widget. The argument of this event is a [libui.UiAreaMouseEvent](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareamouseevent) object.

### mouseenter

Emitted when the mouse pointer enters the widget.

### mouseleave

Emitted when the mouse pointer leaves the widget.

### dragbroken

Emitted when the window is deactivated during a drag operation. Only implemented on Windows.

### keydown

Emitted when a key was pressed. The argument of this event is a [libui.UiAreaKeyEvent](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareakeyevent) object. The event handler should return `true` to indicate that the key event was handled.

### keyup

Emitted when a key was released. The argument of this event is a [libui.UiAreaKeyEvent](https://github.com/parro-it/libui-node/blob/master/docs/area.md#uiareakeyevent) object. The event handler should return `true` to indicate that the key event was handled.

## Example

```markup
<Area v-on:mousedown="mouseDown" v-on:mouseup="mouseUp">
  <AreaPath v-bind:path="circlePath" v-bind:fill="redBrush"/>
</Area>
```

