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
                 :showDone="board.showDone"
                 :prependNewItem="board.prependNewItem"
                 @showDoneSwitched="showDoneSwitched"
                 @prependNewItemChange="prependNewItemChange"
          >
          </board>
        </Tab-pane>
        <div slot="extra">
          <Tooltip content="Add new board" placement="left-start" :transfer="true" :delay="500">
            <Button type="dashed"
                    @click="showNewBoardModal"
                    size="small"
                    icon="plus"
                    shape="circle"
                    :disabled="boards.length > 4"
                    style="margin-right: 5px;">
            </Button>
          </Tooltip>
          <Tooltip content="Settings" placement="left-start" :transfer="true" :delay="500">
            <Button type="dashed"
                    @click="showSettingsModal"
                    size="small"
                    icon="gear-a"
                    shape="circle"
                    style="margin-right: 5px;">
            </Button>
          </Tooltip>
        </div>
      </Tabs>
      </Col>
    </Row>
    <footer @click="open('https://github.com/czytelny')">
      Crafted with
      <Icon type="ios-heart"></Icon>
      by Michal Chwedczuk
    </footer>

    <new-board-modal :newBoardModal="newBoardModal"
                     @submitNewBoard="submitNewBoard"
                     @closeNewBoardModal="closeNewBoardModal">
    </new-board-modal>
    <settings-modal :isVisible="settingsModal"
                    :boards="boards"
                    @closeSettingsModal="closeSettingsModal"
                    @saveBoards="saveBoards"
                    @forceReload="forceReload"
    >
    </settings-modal>
  </div>
</template>

<script>

  import Board from './Board.vue'
  import NewBoardModal from './NewBoardModal.vue'

  import XXH from 'xxhashjs'
  import SettingsModal from './SettingsModal.vue'

  const storage = require('electron').remote.require('electron-settings')
  const remote = require('electron').remote

  export default {
    components: {
      SettingsModal,
      NewBoardModal,
      Board
    },
    name: 'landing-page',
    data () {
      return {
        newItem: '',
        boards: [],
        selectedTab: 'default',
        newBoardModal: false,
        settingsModal: false
      }
    },
    methods: {
      prependNewItemChange (value, boardId) {
        this.boards.find(board => board.id === boardId).prependNewItem = value
        this.boards = this.boards.splice(0)
        this.saveBoards()
      },
      showDoneSwitched (value, boardId) {
        this.boards.find(board => board.id === boardId).showDone = value
        this.boards = this.boards.splice(0)
        this.saveBoards()
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      closeNewBoardModal () {
        this.newBoardModal = false
      },
      showNewBoardModal () {
        this.newBoardModal = true
      },
      showSettingsModal () {
        this.settingsModal = true
      },
      closeSettingsModal () {
        this.settingsModal = false
      },
      submitNewBoard (boardName) {
        const newBoardId = XXH.h32(boardName, new Date().getTime()).toString(16)
        this.boards.push({id: newBoardId, label: boardName, showDone: false})
        this.saveBoards()
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
          storage.set('boards', [{
            id: 'default',
            label: 'Default board',
            showDone: false,
            prependNewItem: false
          }])
        }
        this.boards = storage.get('boards')
        console.log(storage.getAll())
      },
      handleBoardRemove (boardId) {
        const boardIndex = this.boards.findIndex(board => board.id === boardId)
        this.boards.splice(boardIndex, 1)
        storage.set(`boards`, this.boards)
        storage.delete(`board-item-${boardId}`)
        this.saveActiveBoard(this.selectedTab)
      },
      saveActiveBoard (boardId) {
        storage.set(`activeBoard`, boardId)
      },
      saveBoards () {
        storage.set(`boards`, this.boards)
      },
      forceReload () {
        remote.getCurrentWindow().reload()
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
  footer {
    position: fixed;
    bottom: 0;
    background-color: #5a6376;
    color: white;
    text-align: center;
    width: 100%;
    cursor: pointer;
    opacity: .4;
  }

  .ivu-tabs-bar {
    -webkit-user-select: none;
  }
</style>
