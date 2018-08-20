# Tab

A container that shows each child widget in a separate tab.

The tab container can contain one or more children, typically other containers.

## Attributes

### margined

type: Boolean

Whether the tab container adds a margin around the content of each tab.

## Child Attributes

The following attributes can be added to child components to change the way they are handled by the tab container.

### label

type: String

The caption displayed on the tab.

## Example

```markup
<Tab margined>
  <Box label="Tab 1" padded>
    ...
  </Box>
  <Box label="Tab 2" padded>
    ...
  </Box>
  <Box label="Tab 3" padded>
    ...
  </Box>
</Tab>
```

