<template>
  <form action="#" v-on:submit.prevent="submitNewItem">
    <div class="input-row">
      <span class="input-form">
        <input ref="mainInput"
               :id="'newItem-'+boardId"
               v-model="newItem"
               placeholder="Add New Item..."
               @on-enter="submitNewItem"
               @on-click="submitNewItem"
               v-shortkey="{win:['ctrl', 'n'],mac:['meta', 'n']}" @shortkey="inputFocus()"
               icon="plus"
               class="animated ivu-input ivu-input-large"
               :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}"
               style="width: calc(100% - 10px); margin:2px;">
      </span>
      <span class="input-switch">
        <i-switch :value="prependNewItem"
                  @on-change="prependNewItemChange"
                  size="large"
        >
          <span slot="open">Head</span>
          <span slot="close">Tail</span>
        </i-switch>
      </span>
    </div>
  </form>
</template>

<script>
  import {Switch} from 'iview'

  export default {
    name: 'NewItemInput',
    props: [],
    components: {
      'i-switch': Switch
    },
    created () {
      this.focusOnInput()
      this.$bus.$on('focusOnAddItem', this.focusOnInput)
    },
    computed: {
      boardId () {
        return this.$route.params.boardId
      },
      newItem: {
        get () {
          return this.$store.state.boards.newItem
        },
        set (val) {
          this.$store.dispatch('setNewItemVal', val)
        }
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
  .input-row {
    display: flex;
    align-items: center;
  }

  .input-form {
    flex: 1
  }

  .input-switch {
    flex: 0;
  }
</style>
