<template>
  <Window title="Vuido Demo" width="1000" height="400" margined v-on:close="exit">
    <Box horizontal padded>
      <Group stretchy title="Input Widgets" margined>
        <Box padded>
          <Box horizontal padded>
            <TextInput stretchy v-model="text"/>
            <TextInput stretchy v-model="text" readonly/>
          </Box>
          <Box stretchy horizontal padded>
            <TextArea stretchy v-model="multilineText"/>
            <TextArea stretchy v-model="multilineText" readonly/>
          </Box>
          <Box horizontal padded>
            <Slider stretchy min="0" max="100" v-bind:value="slider" v-on:changed="slider = $event"/>
            <Slider stretchy min="0" max="100" v-bind:value="slider" v-bind:enabled="false"/>
          </Box>
          <Box horizontal padded>
            <ColorButton stretchy v-bind:color="color" v-on:changed="color = $event"/>
            <TextInput stretchy v-bind:value="color" readonly/>
          </Box>
          <Box horizontal padded>
            <FontButton stretchy v-bind:font="font" v-on:changed="font = $event"/>
            <TextInput stretchy v-bind:value="fontString" readonly/>
          </Box>
        </Box>
      </Group>
      <Group title="Miscellaneous" margined>
        <Box padded>
          <Box horizontal padded>
            <Box stretchy horizontal padded>
              <Checkbox text="Enabled" v-bind:checked="enabled" v-on:toggled="enabled = $event"/>
              <Checkbox text="Visible" v-bind:checked="visible" v-on:toggled="visible = $event"/>
            </Box>
            <Button stretchy v-bind:enabled="enabled" v-bind:visible="visible">Button</Button>
          </Box>
          <Separator/>
          <Box horizontal padded>
            <RadioButtons stretchy v-bind:items="[ 'Button', 'Text input', 'Text' ]" v-bind:selected="radio" v-on:on-selected="radio = $event"/>
            <Box stretchy>
              <Button v-if="radio == 0">Button</Button>
              <TextInput v-else-if="radio == 1" v-model="text"/>
              <Text v-else>Text</Text>
            </Box>
          </Box>
          <Separator/>
          <Box horizontal padded>
            <Button v-on:click="changeProgress( -10 )">Decrease</Button>
            <Button v-on:click="changeProgress( 10 )">Increase</Button>
            <Button v-on:click="progress = -1">Infinity</Button>
          </Box>
          <ProgressBar v-bind:value="progress"/>
          <Separator/>
          <Box horizontal padded>
            <DatePicker/>
            <Separator vertical/>
            <TimePicker/>
            <Separator vertical/>
            <DateTimePicker/>
          </Box>
          <Separator/>
          <Tab stretchy>
            <Box label="Tab 1">
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </Box>
            <Box label="Tab 2">
              <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</Text>
            </Box>
            <Box label="Tab 3">
              <Text>Ut enim ad minima veniam.</Text>
            </Box>
          </Tab>
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
        text: 'Text input',
        multilineText: 'Text area',
        slider: 40,
        color: '#00af82',
        font: new libui.FontDescriptor( 'Arial', 10, libui.textWeight.normal, libui.textItalic.normal, libui.textStretch.normal ),
        enabled: true,
        visible: true,
        radio: 0,
        progress: 10
      };
    },
    computed: {
      fontString() {
        return this.font.getFamily() + ' ' + this.font.getSize() + ', weight=' + this.font.getWeight() + ', italic=' + this.font.getItalic() + ', stretch=' + this.font.getStretch();
      }
    },
    methods: {
      changeProgress( step ){
        this.progress = Math.min( Math.max( 0, this.progress + step ), 100 );
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>
