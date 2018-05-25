# Group

A container for a single widget that provide a caption and visually group it's children.

## Attributes

### margined

type: Boolean

This property specify if the group content area should have a margin or not. Defaults to false.

### title

type: String

This property specify the caption of the group. Defaults to empty string.


## Example

```markup
<Group title="Button Group" margined>
  <Box horizontal padded>
    <Button v-on:click="ok">OK</Button>
    <Button v-on:click="cancel">Cancel</Button>
  </Box>
</Group>
```

