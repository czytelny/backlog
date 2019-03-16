<template>
  <tr @click="captureCombination">
    <td class="capturing" v-if="keyCapturing">
      <Icon type="ios-radio-button-on" size="15"/>
      Recording...
    </td>
    <td v-else>
      <div>
        <span v-for="(k, index) in keys">
          <kbd>
            <span v-if="k==='meta'">⌘</span>
            <span v-else>{{k}}</span>
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
    props: ['id', 'name', 'keys'],
    data () {
      return {
        keyCapturing: false,
        keysPressed: 0
      }
    },
    methods: {
      captureCombination () {
        if (this.$store.state.modals.keymap.isCapturing === true) {
          return
        }
        this.$store.dispatch('setIsCapturing', true)
        this.keyCapturing = true
        document.onkeydown = (e) => {
          console.log(e.key)
          this.keysPressed++
        }

        document.onkeyup = (e) => {
          this.keysPressed--
          if (this.keysPressed === 0) {
            this.keyCapturing = false
            this.$store.dispatch('setIsCapturing', false)
          }
        }
      }
    }
  }
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
</style>
