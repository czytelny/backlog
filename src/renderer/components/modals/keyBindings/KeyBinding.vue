<template>
  <tr @click="captureCombination">
    <td v-if="keyPressing">
      RECORDING
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
        keyPressing: false,
        keysPressed: 0
      }
    },
    methods: {
      captureCombination () {
        this.keyPressing = true
        document.onkeydown = (e) => {
          console.log(e.key)
          this.keysPressed++
        }

        document.onkeyup = (e) => {
          this.keysPressed--
          if (this.keysPressed === 0) {
            this.keyPressing = false
          }
        }
      }
    }
  }
</script>

<style scoped>
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
