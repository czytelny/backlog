<template>
  <div>
    <input v-model="findItem"
           :id="'findItem-'+boardId"
           class="findItem"
           placeholder="search..."
           icon="ios-search"
           :ref="boardId"
           v-shortkey="{win:['ctrl', 'f'],mac:['meta', 'f']}" @shortkey="inputFocus()"
           size="small">
  </div>
</template>

<script>
  export default {
    name: 'FindItem',
    props: ['boardId'],
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
        return this.$store.state.boards.activeBoard
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
  .findItem {
    margin: 0 5px;
    border: 1px solid transparent;
    -webkit-transition: all .3s;
    font-style: italic;
    border-radius: 5px;
    padding: 3px;
  }

  .findItem:focus {
    outline: none;
    border-color: rgba(44, 133, 229, 0.69);
  }
</style>
