<template>
  <tr @click="captureCombination">
    <td class="capturing" v-if="keyCapturing">
      <div v-if="mappedCombination.length === 0">
        <Icon type="ios-radio-button-on" size="15"/>
        {{$t("modals.recording")}}
      </div>
      <div v-else>
        <span v-for="(k, index) in mappedCombination"
              :key="index">
          <kbd class="capturing">
            <span v-if="k==='meta'">⌘</span>
            <span v-else class="text-uppercase">{{k}}</span>
          </kbd>
          <span v-if="index !== mappedCombination.length - 1">+ </span>
        </span>
      </div>
    </td>
    <td v-else>
      <div>
        <span v-for="(k, index) in keys"
              :key="index">
          <kbd>
            <span v-if="k==='meta'">⌘</span>
            <span v-else class="text-uppercase">{{k}}</span>
          </kbd>
          <span v-if="index !== keys.length - 1">+ </span>
        </span>
      </div>
    </td>
    <td>{{name}}</td>
  </tr>
</template>

<script>
  export default {
    name: 'KeyBinding',
    props: ['id', 'name', 'keys', 'isReadOnly'],
    data () {
      return {
        keyCapturing: false,
        combination: [],
        keysPressed: 0
      };
    },
    computed: {
      isMac () {
        return this.$store.state.modals.keymap.system.includes('mac');
      },
      mappedCombination () {
        return this.combination.map((item) => {
          if (item === 'control') {
            return 'ctrl';
          }
          return item;
        });
      }
    },
    methods: {
      clearCapturing () {
        this.keyCapturing = false;
        this.$store.dispatch('setIsCapturing', false);
        document.onkeydown = null;
        document.onkeyup = null;
      },
      captureCombination () {
        if (this.$store.state.modals.keymap.isCapturing === true) {
          return;
        }
        this.$store.dispatch('setIsCapturing', true);
        this.keyCapturing = true;
        this.combination.length = 0;
        this.keysPressed = 0;

        document.onkeydown = (e) => {
          if (!e.repeat) {
            this.keysPressed++;
            this.combination.push(e.key.toLowerCase());
          }
        };

        document.onkeyup = () => {
          this.clearCapturing();
          if (this.keysPressed > 1 && this.keysPressed < 4) {
            this.$store.dispatch('updateKeyBinding', {
              id: this.id,
              combination: this.mappedCombination,
              isMac: this.isMac
            })
              .then(() => {
                this.$store.dispatch('fetchSettings');
                this.$Message.success('Shortcut modified');
              });
          } else {
            this.$Message.error('Invalid combination');
          }
        };
      }
    }
  };
</script>

<style scoped>
  td {
    padding: 4px;
    height: 33px;
  }

  @keyframes flickerAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .capturing i {
    animation: flickerAnimation 1.5s infinite;
    color: #e43436;
  }


  kbd {
    position: relative;
    display: inline-block;
    margin: 0 1px 2px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    white-space: nowrap;
    letter-spacing: .2px;
    background: #fafafa;
    font-family: inherit;
    line-height: 1em;
    -webkit-transition: background-color .6s;
    transition: background-color .6s;
  }

  kbd.capturing {
    border: 1px solid #62676E;
    background: #fafafa;
    box-shadow: 0 0 4px rgb(88, 187, 115);
  }

</style>
