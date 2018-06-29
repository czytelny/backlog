<template>
  <div id="wrapper"
       :class="{'fixedTabs' : settings.stickBoardsOnTop}">
    <Row style="height: 100%;">
      <Col span="24" style="height: 100%;">
      <Tabs v-model="selectedTab"
            type="card"
            @on-click="saveActiveBoard"
            @dblclick.native="handleDblClick"
            :class="{'fixedTabs' : settings.stickBoardsOnTop}"
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
                 @switchShowDone="switchShowDone"
                 @switchPrependNewItems="loadBoards"
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
                    @closeSettingsModal="closeSettingsModal"
                    @forceReload="forceReload"
    >
    </settings-modal>
  </div>
</template>

<script>
  import Board from './Board.vue'
  import NewBoardModal from './NewBoardModal.vue'
  import SettingsModal from './SettingsModal.vue'
  import boardsRepository from '@/repositories/boardsRepository'
  import settingsRepository from '@/repositories/settingsRepository'

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
          const closer = this.isLastboard ? '' : h('Icon', {
            'class': {'close-icon': true},
            props: {type: 'ios-close-empty'},
            nativeOn: {
              click: (event) => {
                event.stopPropagation()
                this.handleBoardRemove(boardLabel, boardId)
              }
            }
          })
          return h('div', [
            h('span', boardLabel),
            closer
          ])
        }
      }
    },
    computed: {
      isLastboard () {
        return this.boards.length === 1
      }
    },
    methods: {
      handleDblClick (event) {
        if (event.target.className === 'ivu-tabs-nav-scroll') {
          this.showNewBoardModal()
        }
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
      switchShowDone ({boardId, newValue}) {
        boardsRepository.switchShowDone(boardId, newValue)
        this.loadBoards()
      },
      submitNewBoard (boardName) {
        const savedBoard = boardsRepository.saveNewBoard(boardName, this.settings)
        this.selectedTab = savedBoard.id
        this.saveActiveBoard(savedBoard.id)
        this.$nextTick(() => this.$bus.$emit('boardAdded', savedBoard.id))
        this.closeNewBoardModal()
        this.loadBoards()
        this.$Message.success('Board added')
      },
      handleBoardRemove (boardLabel, boardId) {
        this.$Modal.confirm({
          title: `Remove board '${boardLabel}' ?`,
          okText: 'OK, remove it',
          cancelText: 'Cancel',
          content: `<p>You are going to remove board <strong>"${boardLabel}"</strong></p>
                    <p>All items will be deleted, are you sure ?</p>`,
          onOk: () => {
            boardsRepository.removeBoard(boardId)
            const firstBoardId = boardsRepository.getFirstBoard().id
            boardsRepository.setActiveBoard(firstBoardId)
            this.selectedTab = firstBoardId
            this.loadBoards()
            this.$Message.info('Board removed')
          }
        })
      },
      saveActiveBoard (boardId) {
        boardsRepository.setActiveBoard(boardId)
      },
      fetchSettings () {
        this.settings = settingsRepository.getAppSettings()
      },
      loadBoards () {
        this.boards = boardsRepository.getList()
      },
      forceReload () {
        remote.getCurrentWindow().reload()
      },
      importOldEntries () {
        if (!this.settings.wasImported) {
          boardsRepository.importOldEntries()
          settingsRepository.updateAppSettings({'wasImported': true})
        }
      }
    },
    created () {
      this.fetchSettings()
      this.importOldEntries()
      this.loadBoards()
      this.selectedTab = boardsRepository.getActiveBoard()
      this.$nextTick().then(() => this.$bus.$emit('appInit', this.selectedTab))
    }
  }
</script>

<style>
  #wrapper {
    height: 100vh;
  }

  #wrapper.fixedTabs {
    margin-top: 30px;
  }

  div.fixedTabs .ivu-tabs-bar{
    position: fixed;
    top: 0;
    z-index: 100;
    background-color: #fff;
    width: 95vw;
  }
  
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
