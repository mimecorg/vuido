# Group

A container which provides a border with a caption around its content.

The group container must contain exactly one child widget, typically another container.

## Attributes

### margined

type: Boolean

Whether the group adds a margin around its content.

### title

type: String

The caption displayed on the group border.

## Example

```markup
<Group title="Group" margined>
  <Box padded>
    ...
  </Box>
</Group>
```

