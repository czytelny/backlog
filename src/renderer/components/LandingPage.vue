<template>
  <div id="wrapper">
    <Row>
      <Col span="24">
      <Tabs v-model="selectedTab"
            type="card"
            @on-click="saveActiveBoard"
            @dblclick.native="handleDblClick"
      >

        <Tab-pane v-for="board in boards"
                  :label="boardTabLabel(board.label, board.id)"
                  :name="board.id"
                  :key="board.id"
        >
          <board :boardId="board.id"
                 :selectedTab="selectedTab"
                 :showDone="board.showDone"
                 :prependNewItem="board.prependNewItem"
                 :showDate="settings.itemCreationDate"
                 @showDoneSwitched="showDoneSwitched"
                 @prependNewItemChange="prependNewItemChange"
          >
          </board>
        </Tab-pane>
        <div slot="extra">
          <Tooltip content="Add new board" placement="bottom-end" :transfer="true" :delay="500">
            <Button type="dashed"
                    @click="showNewBoardModal"
                    size="small"
                    icon="plus"
                    shape="circle"
                    style="margin-right: 5px;">
            </Button>
          </Tooltip>
          <Tooltip content="Settings" placement="bottom-end" :transfer="true" :delay="500">
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
                    :itemCreationDate="settings.itemCreationDate"
                    @closeSettingsModal="closeSettingsModal"
                    @saveBoards="saveBoards"
                    @forceReload="forceReload"
                    @saveSettings="saveSettings"
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
        settingsModal: false,
        settings: {},
        boardTabLabel: (boardLabel, boardId) => (h) => {
          return h('div', [
            h('span', boardLabel),
            h('Icon', {
              'class': {
                'close-icon': true
              },
              props: {
                type: 'ios-close-empty'
              },
              nativeOn: {
                click: (event) => {
                  event.stopPropagation()
                  this.handleBoardRemove(boardLabel, boardId)
                }
              }
            })
          ])
        }
      }
    },
    methods: {
      handleDblClick (event) {
        if (event.target.className === 'ivu-tabs-nav-scroll') {
          this.showNewBoardModal()
        }
      },
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
      handleBoardRemove (boardLabel, boardId) {
        this.$Modal.confirm({
          title: `Remove board '${boardLabel}' ?`,
          okText: 'OK, remove it',
          cancelText: 'Cancel',
          content: `<p>You are going to remove board <strong>"${boardLabel}"</strong></p>
                    <p>All items will be deleted, are you sure ?</p>`,
          onOk: () => {
            const boardIndex = this.boards.findIndex(board => board.id === boardId)
            this.boards.splice(boardIndex, 1)
            storage.set(`boards`, this.boards)
            storage.delete(`board-item-${boardId}`)
            this.saveActiveBoard(this.selectedTab)
            this.$Message.info('Board removed')
          }
        })
      },
      saveActiveBoard (boardId) {
        storage.set(`activeBoard`, boardId)
      },
      saveBoards (newBoards) {
        if (!newBoards) {
          storage.set(`boards`, this.boards)
        } else {
          storage.set(`boards`, newBoards)
        }
      },
      saveSettings (data) {
        storage.set(`settings`, data)
      },
      fetchSettings () {
        const persistedSettings = storage.get(`settings`)
        if (persistedSettings) {
          this.settings = persistedSettings
        }
      },
      forceReload () {
        remote.getCurrentWindow().reload()
      }
    },
    created () {
      this.fetchBoards()
      this.fetchSettings()
      if (storage.has('activeBoard')) {
        this.selectedTab = storage.get('activeBoard')
      }
    }
  }
</script>

<style>
  .ivu-tabs-tab-active .close-icon {
    opacity: 1;
  }

  .ivu-tabs-tab:hover .close-icon {
    display: inline-block;
    opacity: 1;
  }

  .close-icon {
    opacity: 0;
    transition: opacity .3s;
    position: absolute;
    padding-left: 3px;
  }

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
    user-select: none;
  }
</style>
