<template>
  <div class="tab-content">
    <Form inline action="#">
      <Row>
        <Col span="18">
          <Form-item style="width: 95%;">
            <Input ref="mainInput"
                   :autofocus="true"
                   v-model="newTodoItem"
                   placeholder="Type and hit Enter"
                   size="large"
                   @on-enter="submitNewItem"
                   icon="plus"
                   class="animated"
                   :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}">
            </Input>
          </Form-item>
        </Col>
        <Col span="6">
        <Form-item style="width:100%;">
          <i-switch :value="prependNewItem"
                    @on-change="prependNewItemChange(); 
                                focusOnInput();"
                    size="large">
            <span slot="open">Head</span>
            <span slot="close">Tail</span>
          </i-switch>
        </Form-item>
        </Col>
      </Row>
    </Form>
    <div class="showDoneLink">
      <Button v-if="!showDone"
              type="dashed"
              shape="circle"
              :disabled="isBoardItemsEmpty"
              @click="switchShowDone">Show done
      </Button>
      <Button v-if="showDone"
              type="dashed"
              shape="circle"
              :disabled="isBoardItemsEmpty"
              @click="switchShowDone">
        Hide done
      </Button>
    </div>
    <div v-if="isBoardItemsEmpty" class="info">
      <h1>No items on this board, yet</h1>
    </div>

    <div v-if="isAllItemsDone" class="info">
      <h1>Great, all items are done!</h1>
    </div>
    <draggable :list="boardItems" @change="boardItemsRearanged" :options="{ghostClass: 'sortable-ghost'}">
      <transition-group name="list-complete">
        <board-item v-for="item in boardItems"
                    :key="item.id"
                    :itemId="item.id"
                    :isDone="item.isDone"
                    :text="item.text"
                    :created="item.created"
                    :showDate="showDate"
                    v-if="shouldBeDisplayed(item)"
                    @changeIsDone="changeIsDone"
                    @removeItem="removeItem"
                    @changeItemVal="changeItemVal"
        >
        </board-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import XXH from 'xxhashjs'
  import BoardItem from './BoardItem.vue'

  const storage = require('electron').remote.require('electron-settings')

  export default {
    name: 'board',
    props: ['boardId', 'selectedTab', 'showDone', 'prependNewItem', 'showDate'],
    components: {
      BoardItem,
      draggable
    },
    data () {
      return {
        boardItems: [],
        newTodoItem: '',
        isSubmittingNewItem: false,
        isEditingItem: false
      }
    },
    computed: {
      isActive () {
        return this.boardId === this.selectedTab
      },
      isBoardItemsEmpty () {
        return !this.boardItems.length
      },
      isAllItemsDone () {
        return this.boardItems.length && !this.boardItems.find(item => !item.isDone)
      }
    },
    methods: {
      boardItemsRearanged () {
        this.saveBoardItems()
      },
      prependNewItemChange () {
        this.$emit('prependNewItemChange', !this.prependNewItem, this.boardId)
      },
      switchShowDone () {
        this.$emit('showDoneSwitched', !this.showDone, this.boardId)
      },
      changeIsDone (itemId, newVal) {
        this.boardItems.find(item => item.id === itemId).isDone = newVal
        this.boardItems = this.boardItems.slice(0)
        this.saveBoardItems()
      },
      shouldBeDisplayed (item) {
        if (!item.isDone) {
          return true
        }
        return this.showDone
      },
      submitNewItem () {
        if (this.newTodoItem.length === 0) {
          return
        }
        this.isSubmittingNewItem = true
        const newBoardItem = {
          id: XXH.h32(this.newTodoItem, new Date().getTime()).toString(16),
          text: this.newTodoItem,
          isDone: false,
          created: new Date()
        }
        if (this.prependNewItem) {
          this.boardItems.unshift(newBoardItem)
        } else {
          this.boardItems.push(newBoardItem)
        }
        this.newTodoItem = ''
        this.saveBoardItems()
        this.$nextTick(() => {
          this.isSubmittingNewItem = false
        })
      },
      removeItem (itemId) {
        const indexToRemove = this.boardItems.findIndex(el => el.id === itemId)
        if (indexToRemove !== -1) {
          this.boardItems.splice(indexToRemove, 1)
          this.saveBoardItems()
          this.focusOnInput()
        }
      },
      changeItemVal (itemId, itemVal) {
        const item = this.boardItems.find(el => el.id === itemId)
        if (item) {
          item.text = itemVal
          this.boardItems = this.boardItems.slice(0)
          this.saveBoardItems()
        }
        this.focusOnInput()
      },
      focusOnInput () {
        this.$refs['mainInput'].focus()
      },
      saveBoardItems () {
        storage.set(`board-item-${this.boardId}`, this.boardItems)
      },
      fetchBoardItems () {
        if (storage.has(`board-item-${this.boardId}`)) {
          this.boardItems = storage.get(`board-item-${this.boardId}`)
        }
      }
    },
    watch: {
      selectedTab () {
        if (this.isActive) {
          setTimeout(() => {
            this.$refs['mainInput'].focus()
          }, 250)
        }
      }
    },
    created () {
      const vm = this
      this.$bus.$on('boardAdded', function (boardId) {
        if (vm.boardId === boardId) {
          setTimeout(() => {
            if (vm.$refs['mainInput']) {
              vm.$refs['mainInput'].focus()
            }
          }, 250)
        }
      })
      this.fetchBoardItems()
    }
  }
</script>

<style>
  .sortable-ghost {
    opacity: 0;
  }

  .info {
    text-align: center;
    font-size: 1.5em;
    opacity: .25;
    padding: 20px 0;
  }

  .showDoneLink {
    text-align: center;
  }

  .tab-content {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  .list-complete-item {
    transition: all .3s;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateX(-100%);
  }

  .list-complete-leave-active {

  }
</style>
