<template>
  <div>
    <input v-model="findItem"
           :id="'findItem-'+boardId"
           class="findItem"
           placeholder="search..."
           icon="ios-search"
           :ref="boardId"
           v-shortkey="['ctrl', 'f']" @shortkey="inputFocus()"
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
    border: none;
    border-bottom: 1px dotted #cecece;
    -webkit-transition: all .3s;
    font-style: italic;
  }

  .findItem:focus {
    outline: none;
    border-color: rgba(44, 133, 229, 0.69);
  }
</style>
