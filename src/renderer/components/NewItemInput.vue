<template>
  <form action="#" v-on:submit.prevent="submitNewItem">
    <Row class="input-row">
      <Col class="input-form">
        <Input ref="mainInput"
               :autofocus="true"
               v-model="newItem"
               placeholder="Type and hit Enter"
               size="large"
               @on-enter="submitNewItem"
               @on-click="submitNewItem"
               icon="plus"
               class="animated"
               :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}"
               style="width: calc(100% - 10px);"></Input>
      </Col>
      <Col class="input-switch">
        <i-switch :value="prependNewItem"
                  @on-change="prependNewItemChange"
                  size="large"
        >
          <span slot="open">Head</span>
          <span slot="close">Tail</span>
        </i-switch>
      </Col>
    </Row>
  </form>
</template>

<script>
  export default {
    name: 'NewItemInput',
    props: ['boardId', 'prependNewItem'],
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
      }
    },
    methods: {
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
  }
</script>

<style scoped>

</style>
