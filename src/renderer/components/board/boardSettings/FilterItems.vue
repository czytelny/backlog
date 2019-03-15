<template>
  <div class="find-item-container">
    <input v-model="findItem"
           :id="'findItem-' + activeBoardId"
           class="findItem"
           placeholder="Filter items list..."
           :ref="activeBoardId"
           v-shortkey="{win:['ctrl', 'f'],mac:['meta', 'f']}" @shortkey="inputFocus()"
    >
    <Icon  class="clear-btn"
           :class="{'clear-btn-visible': findItem.length}"
           type="ios-close-circle-outline" @click="clearFilterInput"/>
  </div>
</template>

<script>
  export default {
    name: 'FindItem',
    computed: {
      findItem: {
        get () {
          return this.$store.state.boards.findItem.itemText
        },
        set (val) {
          this.$store.dispatch('changeFindItem', val)
        }
      },
      activeBoardId () {
        return this.$store.state.boards.activeBoard.id
      }
    },
    methods: {
      inputFocus () {
        document.getElementById(`findItem-${this.activeBoardId}`).focus()
      },
      clearFilterInput () {
        this.findItem = ''
        this.inputFocus()
      }
    }
  }
</script>

<style>
  .find-item-container {
    width: 60%;
  }

  .clear-btn {
    opacity: 0;
    margin-left: -22px;
    transition: all .3s;
  }

  .clear-btn-visible {
    opacity: 1;
    cursor: pointer;
  }
  .findItem {
    border: 1px dashed #eeeeee;
    -webkit-transition: all .3s;
    border-radius: 3px;
    padding: 4px 8px;
    width: 95%;
  }

  .findItem:focus {
    outline: none;
    border-color: #626870;
  }
</style>
