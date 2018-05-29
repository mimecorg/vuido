# ProgressBar

A progress bar widget.

## Attributes

### value

type: Number

The current position of the progress bar in the range from 0 to 100.

Set the value to -1 to indicate and indeterminate progress. This is useful when the exact progress is unknown but you wish to indicate that progress is being made.

## Example

```markup
<ProgressBar v-bind:value="progress"/>
```

