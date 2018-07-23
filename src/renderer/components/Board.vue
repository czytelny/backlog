<template>
  <div class="tab-content">
    <form action="#" v-on:submit.prevent="submitNewItem">
      <Row class="input-row">
        <Col class="input-form">
          <Input ref="mainInput"
                 :autofocus="true"
                 v-model="newTodoItem"
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
    <draggable :list="boardItems" @change="boardItemsRearanged" :options="{ghostClass: 'sortable-ghost',
                                                                       handle: '.draggable'}">
      <transition-group name="list-complete">
        <board-item v-for="item in boardItems"
                    :key="item.id"
                    :itemId="item.id"
                    :isDone="item.isDone"
                    :text="item.text"
                    :created="item.created"
                    :showDate="showDate"
                    :boardId="boardId"
                    :markdownMode="markdownMode"
                    v-if="shouldBeDisplayed(item)"
                    @changeIsDone="changeIsDone"
                    @removeItem="removeItem"
                    @changeItemVal="changeItemVal"
                    @moveItemToTop="moveItemToTop"
                    @moveItemToBottom="moveItemToBottom"
                    @showMoveToBoardModal="showMoveToBoardModal"
        >
        </board-item>
      </transition-group>
    </draggable>

    <move-to-board-modal :boardId="boardId"
                         :movingItemId="movingItemId"
                         @moveTo="moveItemToBoard"
                         >
    </move-to-board-modal>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import BoardItem from './BoardItem.vue'
  import boardsRepository from '@/repositories/boardsRepository'
  import itemsRepository from '@/repositories/itemsRepository'
  import MoveToBoardModal from './MoveToBoardModal'

  export default {
    name: 'board',
    props: ['boardId', 'selectedTab', 'showDone', 'prependNewItem', 'showDate', 'markdownMode'],
    components: {
      MoveToBoardModal,
      BoardItem,
      draggable
    },
    data () {
      return {
        boardItems: [],
        newTodoItem: '',
        isSubmittingNewItem: false,
        isEditingItem: false,
        movingItemId: null
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
        boardsRepository.saveItemsArray(this.boardId, this.boardItems)
      },
      prependNewItemChange (val) {
        itemsRepository.switchPrependNewItem(this.boardId, val)
        this.focusOnInput()
        this.$emit('switchPrependNewItems')
      },
      switchShowDone () {
        this.$emit('switchShowDone', {boardId: this.boardId, newValue: !this.showDone})
      },
      changeIsDone (itemId, newVal) {
        itemsRepository.switchIsDone(this.boardId, itemId, newVal)
        this.fetchBoardItems()
      },
      shouldBeDisplayed (item) {
        if (!item.isDone) {
          return true
        }
        return this.showDone
      },
      submitNewItem () {
        if (this.newTodoItem.trim().length === 0) {
          this.newTodoItem = ''
          return
        }
        this.isSubmittingNewItem = true
        if (this.prependNewItem) {
          boardsRepository.addItemToBegin(this.boardId, this.newTodoItem)
        } else {
          boardsRepository.addItemToEnd(this.boardId, this.newTodoItem)
        }
        this.newTodoItem = ''
        this.$Message.success('Item added')
        this.fetchBoardItems()
        this.$nextTick(() => {
          this.isSubmittingNewItem = false
        })
      },
      removeItem (itemId) {
        itemsRepository.removeItem(this.boardId, itemId)
        this.focusOnInput()
        this.fetchBoardItems()
        this.$Message.success('Item removed')
      },
      changeItemVal (itemId, itemVal) {
        itemsRepository.changeItemValue(this.boardId, itemId, itemVal)
        this.fetchBoardItems()
        this.focusOnInput()
      },
      moveItemToTop (itemId) {
        boardsRepository.moveItemToTop(this.boardId, itemId)
        this.fetchBoardItems()
        this.focusOnInput()
      },
      moveItemToBottom (itemId) {
        boardsRepository.moveItemToBottom(this.boardId, itemId)
        this.fetchBoardItems()
        this.focusOnInput()
      },
      moveItemToBoard (dstBoardId) {
        boardsRepository.moveItemToBoard(this.boardId, dstBoardId, this.movingItemId)
        this.fetchBoardItems()
        this.focusOnInput()
      },
      showMoveToBoardModal (itemId) {
        this.movingItemId = itemId
        this.$store.dispatch('showMoveToBoard')
      },
      focusOnInput () {
        const vm = this
        setTimeout(() => {
          if (vm.$refs['mainInput']) {
            vm.$refs['mainInput'].focus()
          }
        }, 250)
      },
      fetchBoardItems (boardId = this.boardId) {
        const items = boardsRepository.getItems(boardId)
        if (items) {
          this.boardItems = items
        }
      }
    },
    watch: {
      selectedTab () {
        if (this.isActive) {
          this.focusOnInput()
          this.fetchBoardItems(this.boardId)
        }
      }
    },
    created () {
      const vm = this
      const boardEnterFn = function (boardId) {
        setTimeout(() => {
          if (vm.boardId === boardId) {
            vm.focusOnInput()
          }
        }, 250)
      }
      this.$bus.$on('boardAdded', boardEnterFn)
      this.$bus.$on('appInit', boardEnterFn)
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
    padding: 20px 0;
  }

  .tab-content {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    height: 100%;
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
