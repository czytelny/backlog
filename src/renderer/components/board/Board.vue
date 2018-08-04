<template>
  <div class="tab-content">
    <NewItemInput ref="newItemInput"
                  :boardId="board.id"
                  :prependNewItem="board.prependNewItem"
                  @prependNewItemSwitched="focusOnInput"/>

    <div class="board-actions">
      <ShowDoneButton :boardId="board.id"
                      :showDone="board.showDone"
                      :isBoardItemsEmpty="isBoardItemsEmpty"/>
      <FindItem :boardId="board.id"></FindItem>
    </div>

    <div v-if="isBoardItemsEmpty" class="info">
      <h1>No items on this board, yet</h1>
    </div>

    <div v-if="isAllItemsDone" class="info">
      <h1>Great, all items are done!</h1>
    </div>

    <div v-if="!filteredBoardItems.length && !isBoardItemsEmpty" class="info">
      <h1>No results...</h1>
    </div>
    <StatusBar :board-items="boardItems"></StatusBar>

    <draggable :list="boardItems"
               v-if="filteredBoardItems.length"
               @change="boardItemsRearanged"
               class="board"
               :class="{'filteredBoard' : isFiltered}"
               :options="{ghostClass: 'sortable-ghost',
                          handle: '.draggable'}">
      <transition-group name="list-complete">
        <board-item v-for="item in filteredBoardItems"
                    :key="item.id"
                    :itemId="item.id"
                    :isDone="item.isDone"
                    :text="item.text"
                    :created="item.created"
                    :boardId="boardId"
                    v-if="shouldBeDisplayed(item)"
                    @itemChanged="itemChanged"
        >
        </board-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import BoardItem from '@/components/board/item/BoardItem.vue'
  import boardsRepository from '@/repositories/boardsRepository'
  import NewItemInput from '@/components/board/NewItemInput'
  import ShowDoneButton from './ShowDoneButton'
  import FindItem from './FindItem'
  import StatusBar from './StatusBar'

  export default {
    name: 'board',
    props: ['board'],
    components: {
      StatusBar,
      FindItem,
      ShowDoneButton,
      NewItemInput,
      BoardItem,
      draggable
    },
    data () {
      return {
        boardItems: []
      }
    },
    computed: {
      boardId () {
        return this.board.id
      },
      activeBoardId () {
        return this.$store.state.boards.activeBoard
      },
      isBoardItemsEmpty () {
        return !this.boardItems.length
      },
      isAllItemsDone () {
        return this.boardItems.length && !this.boardItems.find(item => !item.isDone)
      },
      filterString () {
        return this.$store.state.boards.findItem.itemText.toLowerCase()
      },
      filteredBoardItems () {
        return this.boardItems.filter((item) => item.text.toLowerCase().includes(this.filterString))
      },
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0
      }
    },
    methods: {
      boardItemsRearanged () {
        boardsRepository.saveItemsArray(this.boardId, this.boardItems)
      },
      shouldBeDisplayed (item) {
        if (!item.isDone) {
          return true
        }
        return this.board.showDone
      },
      itemChanged () {
        this.fetchBoardItems()
        this.focusOnInput()
      },
      fetchBoardItems (boardId = this.activeBoardId) {
        this.$store.dispatch('fetchBoard', this.board.id)
      },
      focusOnInput () {
        const vm = this
        setTimeout(() => {
          if (vm.$refs['newItemInput'].$refs['mainInput']) {
            vm.$refs['newItemInput'].$refs['mainInput'].focus()
          }
        }, 250)
      }
    },
    watch: {
      board () {
        const items = JSON.parse(JSON.stringify(this.board.items))
        if (items) {
          this.boardItems = items
        }
      },
      activeBoardId () {
        if (this.boardId === this.activeBoardId) {
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
      this.$bus.$on('itemMoved', (boardId) => {
        if (boardId === this.boardId) {
          this.fetchBoardItems(boardId)
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

  .board {
    border: 1px dashed transparent;
    background-color: transparent;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .filteredBoard {
    border: 1px dashed #d6dece;
    background-color: #f8f8f8;
    border-radius: 3px;
  }

  .board-actions {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .info {
    text-align: center;
    font-size: 1.5em;
    opacity: .25;
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
