<template>
  <div class="find-item-container">
    <input v-model="findItem"
           :id="'findItem-' + activeBoardId"
           class="findItem"
           placeholder="Filter"
           :ref="activeBoardId"
           v-shortkey="filterItemsShortcut"
           @shortkey="inputFocus()"
    >
    <span class="shortcut">
      <code>{{filterItemsShortcutString}}</code>
    </span>
    <Icon class="clear-btn"
          :class="{'clear-btn-visible': findItem.length}"
          type="ios-close-circle-outline" @click="clearFilterInput"/>
  </div>
</template>

<script>
  export default {
    name: 'FindItem',
    computed: {
      filterItemsShortcut () {
        return this.$store.state.settings.keyBindings.filterItemsFocus
      },
      filterItemsShortcutString () {
        if (this.$store.state.modals.keymap.system.includes('mac')) {
          return `${this.$store.state.settings.keyBindings.filterItemsFocus.mac.join(' + ')}`
        } else {
          return `${this.$store.state.settings.keyBindings.filterItemsFocus.win.join(' + ')}`
        }
      },
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

<style scoped>
  ::-webkit-input-placeholder {
    font-style: italic;
    color: #cecece;
  }

  .find-item-container {
    width: 60%;
    position: relative;
  }

  .find-item-container input:focus + .shortcut{
    opacity: 0;
  }

  .shortcut{
    position: absolute;
    right: 42px;
    top: 5px;
    color: #dddddd;
    transition: opacity .3s;
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
    border-top: 1px dashed transparent;
    border-left: 1px dashed transparent;
    border-right: 1px dashed transparent;
    border-bottom: 1px dashed #eeeeee;
    -webkit-transition: all .3s;
    border-radius: 4px;
    padding: 4px 8px;
    width: 95%;
  }

  .findItem:focus {
    outline: none;
    border-color: rgba(98, 104, 112, 0.43);
  }
</style>
