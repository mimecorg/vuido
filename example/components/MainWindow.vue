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
          <TextArea stretchy v-model="multilineText"/>
          <Text>Number of lines: {{ numberOfLines }}</Text>
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
          <Box horizontal padded>
            <DatePicker/>
            <Separator vertical/>
            <TimePicker/>
            <Separator vertical/>
            <DateTimePicker stretchy/>
          </Box>
          <Box padded>
            <FontButton :font="font" @changed="onFontChanged"/>
            <Text stretchy>{{fontString}}</Text>
            <Separator />
          </Box>
          <Box horizontal padded>
            <ProgressBar :value="progress" stretchy/>
            <Separator vertical/>
            <Button @click="changeProgress(-10)">-10</Button>
            <Button @click="changeProgress(10)">+10</Button>
            <Button @click="changeProgress(1, true)">Infinity</Button>
          </Box>
          <Box padded>
            <RadioButtons :items="radio.items" :selected="radio.selected"  @on-selected="onRadioSelected"/>
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
        progress: 10,
        text: 'Edit me',
        multilineText: 'Edit me too',
        isChecked: true,
        color: '#ffeeff',
        font: null,
        radio: {
          items: ['Option 1', 'Option 2', 'Option 3'],
          selected: 1
        }
      };
    },
    created() {
      this.font = new libui.FontDescriptor('Arial', 10, libui.textWeight.normal, libui.textItalic.normal, libui.textStretch.normal);
    },
    computed: {
      numberOfLines() {
        return this.multilineText.split( '\n' ).length;
      },
      fontString() {
        return `Font: ${this.font.getFamily()}, Size: ${this.font.getSize()}, Weight: ${this.font.getWeight()} `;
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
        this.random = Math.floor(Math.random() * 1000);
      },
      onToggled(val) {
        this.isChecked = val;
      },
      onColorChanged(val) {
        this.color = val;
      },
      onFontChanged(val) {
        this.font = val;
      },
      changeProgress(val, inf = false){
        if(inf)
          this.progress = -1;
        else
          this.progress = Math.min(Math.max(0, this.progress + val), 100);
      },
      onRadioSelected(val){
        this.radio.selected = val;
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>
