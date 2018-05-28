<template>
  <Window title="Vuido Demo" width="1000" height="400" margined v-on:show="show" v-on:close="exit">
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
            <Slider stretchy min="0" max="100" v-model="slider"/>
            <Slider stretchy min="0" max="100" v-model="slider" v-bind:enabled="false"/>
          </Box>
          <Box horizontal padded>
            <ColorButton stretchy v-model="color"/>
            <TextInput stretchy v-bind:value="colorString" readonly/>
          </Box>
          <Box horizontal padded>
            <FontButton ref="fontButton" stretchy v-on:change="font = $event"/>
            <TextInput stretchy v-bind:value="fontString" readonly/>
          </Box>
        </Box>
      </Group>
      <Group title="Miscellaneous" margined>
        <Box padded>
          <Box horizontal padded>
            <Box stretchy horizontal padded>
              <Checkbox v-model="enabled">Enabled</Checkbox>
              <Checkbox v-model="visible">Visible</Checkbox>
            </Box>
            <Button stretchy v-bind:enabled="enabled" v-bind:visible="visible">Button</Button>
          </Box>
          <Separator horizontal/>
          <Box horizontal padded>
            <RadioButtons stretchy v-bind:items="[ 'Button', 'Text input', 'Text' ]" v-model="radio"/>
            <Box stretchy>
              <Button v-if="radio == 0">Button</Button>
              <TextInput v-else-if="radio == 1" v-model="text"/>
              <Text v-else>Text</Text>
            </Box>
          </Box>
          <Separator horizontal/>
          <Box horizontal padded>
            <Button v-on:click="changeProgress( -10 )">Decrease</Button>
            <Button v-on:click="changeProgress( 10 )">Increase</Button>
            <Button v-on:click="progress = -1">Infinity</Button>
          </Box>
          <ProgressBar v-bind:value="progress"/>
          <Separator horizontal/>
          <Box horizontal padded>
            <DatePicker/>
            <Separator/>
            <TimePicker/>
            <Separator/>
            <DateTimePicker/>
          </Box>
          <Separator horizontal/>
          <Tab stretchy margined>
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
        color: new libui.Color( 0, 175 / 255, 130 / 255, 1 ),
        font: null,
        enabled: true,
        visible: true,
        radio: 0,
        progress: 10
      };
    },
    computed: {
      colorString() {
        return 'R: ' + Math.floor( this.color.r * 255 ) + ', G: ' + Math.floor( this.color.g * 255 ) + ', B: ' + Math.floor( this.color.b * 255 ) + ', A: ' + Math.floor( this.color.a * 255 );
      },
      fontString() {
        if ( this.font != null )
          return this.font.getFamily() + ' ' + this.font.getSize() + ', weight=' + this.font.getWeight() + ', italic=' + this.font.getItalic() + ', stretch=' + this.font.getStretch();
      }
    },
    methods: {
      show() {
        this.font = this.$refs.fontButton.font;
      },
      changeProgress( step ){
        this.progress = Math.min( Math.max( 0, this.progress + step ), 100 );
      },
      exit() {
        libui.stopLoop();
      }
    }
  }
</script>
