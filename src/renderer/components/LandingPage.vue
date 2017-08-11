<template>
  <div id="wrapper">
    <Row>
      <Col span="24">
      <Tabs v-model="selectedTab"
            type="card"
            closable
            @on-tab-remove="handleBoardRemove"
      >
        <Tab-pane v-for="board in boards"
                  :label="board.label"
                  :name="board.id"
                  :key="board.id"
        >
          <board :boardId="board.id"
                 :selectedTab="selectedTab"
                 :items="boardItems"
                 @submitNewItem="submitNewItem">
          </board>
        </Tab-pane>

        <Button type="ghost"
                @click="showNewBoardModal"
                size="small"
                slot="extra"
                :disabled="boards.length > 4">
          New Board
        </Button>
      </Tabs>
      </Col>
    </Row>
    <new-board-modal :newBoardModal="newBoardModal"
                     @submitNewBoard="submitNewBoard"
                     @closeNewBoardModal="closeNewBoardModal">
    </new-board-modal>
  </div>
</template>

<script>

  import Board from './Board.vue'
  import NewBoardModal from './NewBoardModal.vue'
  import XXH from 'xxhashjs'

  const shortid = require('electron').remote.require('shortid')
  const storage = require('electron').remote.require('electron-settings')

  export default {
    components: {
      NewBoardModal,
      Board
    },
    name: 'landing-page',
    data () {
      return {
        newItem: '',
        boards: [],
        boardItems: [],
        selectedTab: 'default',
        newBoardModal: false
      }
    },
    methods: {
      closeNewBoardModal () {
        this.newBoardModal = false
      },
      showNewBoardModal () {
        this.newBoardModal = true
      },
      submitNewBoard (boardName) {
        const newTabId = XXH.h32(boardName, 0xABCD).toString(16)
        console.log(newTabId)

        this.boards.push({id: newTabId, label: boardName, items: []})
        storage.set(`boards`, this.boards)
        this.selectedTab = newTabId
        this.newBoardModal = false
        this.newBoardName = ''
        this.$Message.success('Board added')
      },
      submitNewItem (itemVal, boardId, prepend) {
        if (!prepend) {
          this.boardItems.push({id: shortid.generate(), text: itemVal, isDone: false})
        } else {
          this.boardItems.unshift({id: shortid.generate(), text: itemVal, isDone: false})
        }
      },
      fetchBoards () {
//        storage.deleteAll()
        const boards = storage.get('boards')
        if (!boards) {
          storage.set('boards', [{id: 'default', label: 'Default board', items: []}])
        }
        this.boards = storage.get('boards')
        console.log(storage.getAll())
      },
      handleBoardRemove (name) {
        const boardIndex = this.boards.findIndex(board => board.id === name)
        this.boards.splice(boardIndex, 1)
        storage.set(`boards`, this.boards)
      }
    },
    created () {
      this.fetchBoards()
    }
  }
</script>

<style>
  .ivu-tabs-bar {
    -webkit-user-select: none;
  }
</style>
