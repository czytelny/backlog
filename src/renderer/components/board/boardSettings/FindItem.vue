<template>
  <div class="find-item-container">
    <input v-model="findItem"
           :id="'findItem-' + activeBoardId"
           class="findItem"
           placeholder="Filter..."
           :ref="activeBoardId"
           v-shortkey="{win:['ctrl', 'f'],mac:['meta', 'f']}" @shortkey="inputFocus()"
    >
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
      }
    }
  }
</script>

<style>
  .find-item-container {
    width: 60%;
  }

  .findItem {
    border: 1px dashed transparent;
    border-bottom-color: #dddddd;
    -webkit-transition: all .3s;
    border-radius: 3px;
    padding: 3px;
    width: 95%;
    background-color: #FAFCFF
  }

  .findItem:focus {
    outline: none;
    border-color: rgba(44, 133, 229, 0.69);
    background-color: rgba(224, 235, 251, 0.67)
  }
</style>
