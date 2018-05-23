<template>
  <Window title="Vuido Control Gallery" width="640" height="480" margined v-on:close="exit">
    <Box horizontal padded>
      <Group title="Vuido Demo" margined>
        <Box padded>
          <Box horizontal padded>
            <Button stretchy @click="switchMode">Switch mode</Button>
            <Button stretchy @click="toggleEnabled">Toggle enabled</Button>
          </Box>
          <Box v-if="counterMode" horizontal padded>
            <Text stretchy>Counter: {{ counter }}</Text>
            <Button :enabled="enabled" @click="decrement">Decrement</Button>
            <Button :enabled="enabled" @click="increment">Increment</Button>
          </Box>
          <Box v-else horizontal padded>
            <Text stretchy>Value: {{ random }}</Text>
            <Button :enabled="enabled" @click="randomize">Randomize</Button>
          </Box>
          <Box horizontal padded>
            <TextInput stretchy v-model="text"/>
            <Text stretchy>{{ text }}</Text>
          </Box>
        </Box>
      </Group>

      <Group title="Basic Controls" margined>
        <Box padded>
          <Box horizontal padded>
            <Button stretchy>Button enabled</Button>
            <Button stretchy :enabled="false">Button disabled</Button>
          </Box>
          <Box horizontal padded>
            <TextInput stretchy v-model="text"/>
            <TextInput stretchy v-model="text" :enabled="false"/>
          </Box>
          <Box horizontal padded>
            <Checkbox text="Checkbox 1" @toggled="onToggled" checked/>
            <Checkbox text="Checkbox 2" :enabled="!isChecked"/>
          </Box>
          <Box horizontal padded>
            <Text stretchy>Color picker</Text>
            <ColorButton @changed="onColorChanged" :color="color" stretchy/>
          </Box>
        </Box>
      </Group>
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
        isChecked : true,
        color: '#ffeeff'
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
        this.random = Math.floor(Math.random() * 1000);
      },
      onToggled(val){
        this.isChecked = val;
      },
      onColorChanged(val) {
        this.color = val;
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>
