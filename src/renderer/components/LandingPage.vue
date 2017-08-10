<template>
  <div id="wrapper">
    <Row>
      <Col span="24">
      <Tabs :value="selectedTab" type="card" closable>
        <Tab-pane v-for="board in boards"
                  :label="board.label"
                  :name="board.id"
                  :key="board.id">
          <board :boardId="board.id"
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
                     @submitNewTab="submitNewTab"
                     @closeNewBoardModal="closeNewBoardModal">
    </new-board-modal>
  </div>
</template>

<script>

  import Board from './Board.vue'
  import NewBoardModal from './NewBoardModal.vue'

  const shortid = require('electron').remote.require('shortid')

  export default {
    components: {
      NewBoardModal,
      Board
    },
    name: 'landing-page',
    data () {
      return {
        newItem: null,
        boards: [{id: 'default', label: 'Default board'}],
        boardItems: [
          {id: 1, text: 'zrobic 1 rzecz', isDone: false},
          {id: 2, text: 'zrobic 2 rzecz', isDone: false},
          {id: 3, text: 'zrobic 3 rzecz', isDone: false}
        ],
        selectedTab: 'default',
        newBoardModal: false
      }
    },
    methods: {
      closeNewBoardModal () {
        console.log('dup')
        this.newBoardModal = false
      },
      showNewBoardModal () {
        this.newBoardModal = true
      },
      submitNewTab (boardName) {
        const newTabId = shortid.generate()
        this.boards.push({id: newTabId, label: boardName})
        this.selectedTab = newTabId
        this.newBoardModal = false
        this.newBoardName = ''
        this.$Message.success('board added')
      },
      submitNewItem (itemVal, boardId, prepend) {
        if (!prepend) {
          this.boardItems.push({id: shortid.generate(), text: itemVal, isDone: false})
        } else {
          this.boardItems.unshift({id: shortid.generate(), text: itemVal, isDone: false})
        }
      }
    }
  }
</script>

<style>
  .ivu-tabs-bar {
    -webkit-user-select: none;
  }
</style>
