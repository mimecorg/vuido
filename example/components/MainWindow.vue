<template>
  <Window title="Vuido Example" width="400" height="100" margined v-on:close="exit">
    <Box padded>
      <Box horizontal padded>
        <Button stretchy v-on:click="switchMode">Switch mode</Button>
        <Button stretchy v-on:click="toggleEnabled">Toggle enabled</Button>
      </Box>
      <Box v-if="counterMode" horizontal padded>
        <Text stretchy>Counter: {{ counter }}</Text>
        <Button v-bind:enabled="enabled" v-on:click="decrement">Decrement</Button>
        <Button v-bind:enabled="enabled" v-on:click="increment">Increment</Button>
      </Box>
      <Box v-else horizontal padded>
        <Text stretchy>Value: {{ random }}</Text>
        <Button v-bind:enabled="enabled" v-on:click="randomize">Randomize</Button>
      </Box>
    </Box>
  </Window>
</template>

<script>
import libui from 'libui-node'

export default {
  data() {
    return {
      counterMode: true,
      enabled: true,
      counter: 0,
      random: 0
    };
  },
  methods: {
    switchMode() {
      this.counterMode = !this.counterMode;
    },
    toggleEnabled() {
      this.enabled = !this.enabled;
    },
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
    randomize() {
      this.random = Math.floor( Math.random() * 1000 );
    },
    exit() {
      libui.stopLoop();
    }
  }
}
</script>
