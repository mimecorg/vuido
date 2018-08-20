# Box

A container which arranges all children vertically or horizontally.

## Attributes

### horizontal

type: Boolean

Whether the box arranges its children vertically or horizontally.

### padded

type: Boolean

Whether the box adds some padding between its children.

## Child Attributes

The following attributes can be added to child components to change the way they are handled by the box container.

### stretchy

type: Boolean

Whether the child stretches to fill available space.

## Example

```markup
<Box horizontal padded>
  <Button v-on:click="ok">OK</Button>
  <Button v-on:click="cancel">Cancel</Button>
</Box>
```

