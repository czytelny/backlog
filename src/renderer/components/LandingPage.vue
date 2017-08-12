<template>
  <div id="wrapper">
    <Row>
      <Col span="24">
      <Tabs v-model="selectedTab"
            type="card"
            closable
            @on-tab-remove="handleBoardRemove"
            @on-click="saveActiveBoard">
        <Tab-pane v-for="board in boards"
                  :label="board.label"
                  :name="board.id"
                  :key="board.id"
        >
          <board :boardId="board.id"
                 :selectedTab="selectedTab"
          >
          </board>
        </Tab-pane>

        <Button type="dashed"
                @click="showNewBoardModal"
                size="small"
                slot="extra"
                icon="plus"
                shape="circle"
                :disabled="boards.length > 4"
                style="margin-right: 5px;">
          Add
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
        const newBoardId = XXH.h32(boardName, 0xABCD).toString(16)
        this.boards.push({id: newBoardId, label: boardName, items: []})
        storage.set(`boards`, this.boards)
        this.selectedTab = newBoardId
        this.newBoardModal = false
        this.saveActiveBoard(newBoardId)
        this.$Message.success('Board added')
        this.$nextTick(() => this.$bus.$emit('boardAdded', newBoardId))
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
        this.saveActiveBoard(this.selectedTab)
      },
      saveActiveBoard (boardId) {
        storage.set(`activeBoard`, boardId)
      }
    },
    created () {
      this.fetchBoards()
      if (storage.has('activeBoard')) {
        this.selectedTab = storage.get('activeBoard')
      }
    }
  }
</script>

<style>
  .ivu-tabs-bar {
    -webkit-user-select: none;
  }
</style>
