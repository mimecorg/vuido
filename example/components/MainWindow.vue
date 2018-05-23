<template>
  <Window title="Vuido Example" width="400" height="300" margined v-on:close="exit">
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
      <Box horizontal padded>
        <TextInput stretchy v-model="text"/>
        <Text stretchy>{{ text }}</Text>
      </Box>
      <TextArea stretchy v-model="multilineText"/>
      <Text>Number of lines: {{ numberOfLines }}</Text>
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
      random: 0,
      text: 'Edit me',
      multilineText: 'Edit me too'
    };
  },
  computed: {
    numberOfLines() {
      return this.multilineText.split( '\n' ).length;
    }
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
