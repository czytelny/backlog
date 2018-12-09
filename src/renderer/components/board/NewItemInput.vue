<template>
  <form action="#" v-on:submit.prevent="submitNewItem">
    <div class="input-row">
      <span class="input-form">
        <input ref="mainInput"
               :id="'newItem-'+boardId"
               :autofocus="true"
               v-model="newItem"
               placeholder="Type and hit Enter"
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
    props: ['boardId', 'prependNewItem'],
    components: {
      'i-switch': Switch
    },
    computed: {
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
      activeBoardId () {
        return this.$store.state.boards.activeBoard
      }
    },
    methods: {
      focusOnInput () {
        const vm = this
        setTimeout(() => {
          if (vm.$refs['newItemInput'].$refs['mainInput']) {
            vm.$refs['newItemInput'].$refs['mainInput'].focus()
          }
        }, 250)
      }
    },
    inputFocus () {
      document.getElementById(`newItem-${this.activeBoardId}`).focus()
    },
    prependNewItemChange (val) {
      this.$store.dispatch('switchPrependNewItem', {boardId: this.boardId, prependNewItem: val})
        .then(() => {
          this.$store.dispatch('fetchBoard', this.boardId)
          this.$emit('prependNewItemSwitched')
        })
    },
    submitNewItem () {
      if (this.newItem.trim().length === 0) {
        this.newItem = ''
        return
      }
      this.isSubmittingNewItem = true
      if (this.prependNewItem) {
        this.$store.dispatch('addItemToBegin', {boardId: this.boardId, newItem: this.newItem})
      } else {
        this.$store.dispatch('addItemToEnd', {boardId: this.boardId, newItem: this.newItem})
      }
      this.newItem = ''
      this.$Message.success('Item added')
      this.$store.dispatch('fetchBoard', this.boardId)
      this.$nextTick(() => {
        this.isSubmittingNewItem = false
      })
    }
  }
</script>

<style scoped>

</style>
