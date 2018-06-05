# Form

A container which arranges its children vertically, with captions next to them.

## Attributes

### padded

type: Boolean

Whether the form adds some padding between its children.

## Child attributes

The following attributes can be added to child components to change the way they are handled by the box container.

### label

type: String

The caption displayed next to the child component.

### stretchy

type: Boolean

Whether the child stretches to fill available space.

## Example

```markup
<Form padded>
  <TextInput label="First name:" v-model="firstName"/>
  <TextInput label="Last name:" v-model="lastName"/>
</Box>
```

