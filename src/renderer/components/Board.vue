<template>
  <div class="tab-content">
    <form action="#" v-on:submit.prevent="submitNewItem">
      <Row>
        <Col span="18">
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
               style="width: 95%;"/>
        </Col>
        <Col span="6">
        <i-switch :value="prependNewItem"
                  @on-change="prependNewItemChange();
                              focusOnInput();"
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
  import BoardItem from './BoardItem.vue'
  import boardsRepository from '@/../repositories/boardsRepository'

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
        boardsRepository.switchPrependNewItem(this.boardId, !this.prependNewItem)
      },
      switchShowDone () {
        boardsRepository.switchShowDone(this.boardId, !this.showDone)
      },
      changeIsDone (itemId, newVal) {
        boardsRepository.switchIsDone(this.boardId, itemId, newVal)
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
        const indexToRemove = this.boardItems.findIndex(el => el.id === itemId)
        if (indexToRemove !== -1) {
          this.boardItems.splice(indexToRemove, 1)
          this.saveBoardItems()
          this.focusOnInput()
          this.$Message.success('Item removed')
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
        const vm = this
        setTimeout(() => {
          if (vm.$refs['mainInput']) {
            vm.$refs['mainInput'].focus()
          }
        }, 250)
      },
      saveBoardItems () {
        // storage.set(`board-item-${this.boardId}`, this.boardItems)
      },
      fetchBoardItems () {
        this.boardItems = boardsRepository.getItems(this.boardId)
      }
    },
    watch: {
      selectedTab () {
        if (this.isActive) {
          this.focusOnInput()
        }
      }
    },
    created () {
      const vm = this
      const boardEnterFn = function (boardId) {
        if (vm.boardId === boardId) {
          vm.focusOnInput()
        }
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
</style>
