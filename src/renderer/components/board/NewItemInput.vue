<template>
  <form action="#" v-on:submit.prevent="submitNewItem" class="new-item-input">
    <div class="input-row">
      <span class="input-form">
        <input ref="mainInput"
               :id="'newItem-'+boardId"
               v-model="newItem"
               placeholder="Add item"
               @on-enter="submitNewItem"
               @on-click="submitNewItem"
               v-shortkey="newItemFocusShortcut"
               @shortkey="focusOnInput"
               icon="plus"
               class="animated ivu-input ivu-input-large"
               :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}"
               style="width: calc(100% - 10px); margin:2px;">
         <span class="shortcut">
          {{newItemFocusShortcutString}}
        </span>
      </span>
      <span class="input-switch">
        <i-switch :value="prependNewItem"
                  @on-change="prependNewItemChange"
                  size="large"
        >
          <span slot="open">
            <Tooltip content="Add item to top">
              Head
            </Tooltip>
          </span>
          <span slot="close">
            <Tooltip content="Add item to tail">
              Tail
            </Tooltip>
          </span>
        </i-switch>
      </span>
    </div>
  </form>
</template>

<script>
  import {Switch} from 'iview'
  import keyShortcutMixin from './../../keyShortcutStringMixin'

  export default {
    name: 'NewItemInput',
    mixins: [keyShortcutMixin],
    props: [],
    components: {
      'i-switch': Switch
    },
    data () {
      return {
        newItem: ''
      }
    },
    created () {
      this.focusOnInput()
      this.$bus.$on('focusOnAddItem', this.focusOnInput)
    },
    computed: {
      boardId () {
        return this.$route.params.boardId
      },
      newItemFocusShortcut () {
        return this.$store.state.settings.keyBindings.newItemFocus
      },
      newItemFocusShortcutString () {
        return this.shortcutString('newItemFocus')
      },
      isSubmittingNewItem: {
        get () {
          return this.$store.state.boards.isSubmittingNewItem
        },
        set (val) {
          this.$store.dispatch('setIsSubmittingNewItem', val)
        }
      },
      prependNewItem () {
        return this.$store.state.boards.activeBoard.prependNewItem
      }
    },
    methods: {
      focusOnInput () {
        const vm = this
        setTimeout(() => {
          if (vm.$refs['mainInput']) {
            vm.$refs['mainInput'].focus()
          }
        }, 250)
      },
      prependNewItemChange (val) {
        this.$store.dispatch('switchPrependNewItem', {
          boardId: this.boardId,
          prependNewItem: val
        }).then(() => {
          this.$emit('prependNewItemSwitched')
          this.focusOnInput()
        })
      },
      submitNewItem () {
        if (this.newItem.trim().length === 0) {
          this.newItem = ''
          return
        }
        this.isSubmittingNewItem = true
        const newItemPromise = this.$store.dispatch('addItem', {boardId: this.boardId, newItem: this.newItem})
        this.$Message.success('Item added')
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.newItem = ''
        this.$nextTick(() => {
          this.isSubmittingNewItem = false
          newItemPromise.then((newItem) => {
            this.$emit('itemAdded', newItem)
          })
        })
      }
    }
  }
</script>

<style scoped>

  ::-webkit-input-placeholder {
    font-style: italic;
  }

  input {
    margin: 0 !important;
  }


  input:focus + .shortcut {
    opacity: 0;
  }

  .shortcut {
    position: absolute;
    right: 32px;
    top: 9px;
    color: #dddddd;
    transition: opacity .3s;
    user-select: none;
  }

  .new-item-input {
    margin-bottom: 16px;
  }

  .input-row {
    display: flex;
    align-items: center;
  }

  .input-form {
    flex: 1;
    position: relative;
  }

  .input-switch {
    flex: 0;
  }
</style>
