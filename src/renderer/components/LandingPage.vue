<template>
  <div id="wrapper"
       :class="{'fixedTabs' : settings.stickBoardsOnTop}">
    <Row style="height: 100%;">
      <Col span="24" style="height: 100%;">
        <Tabs v-model="activeBoard"
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

            <board :board="board"/>

          </Tab-pane>
          <div slot="extra">
            <Tooltip content="Add new board" placement="bottom-end" :transfer="true" :delay="500">
              <Button type="dashed"
                      id="add-new-board-btn"
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

    <new-board-modal @newBoardSubmitted="loadBoards"></new-board-modal>
    <settings-modal></settings-modal>
    <move-to-board-modal></move-to-board-modal>
  </div>
</template>

<script>
  import Board from './Board.vue'
  import NewBoardModal from './NewBoardModal.vue'
  import SettingsModal from './settings/SettingsModal'
  import boardsRepository from '@/repositories/boardsRepository'
  import settingsRepository from '@/repositories/settingsRepository'
  import MoveToBoardModal from './MoveToBoardModal'

  import {mapActions} from 'vuex'

  export default {
    components: {
      SettingsModal,
      NewBoardModal,
      Board,
      MoveToBoardModal
    },
    name: 'landing-page',
    data () {
      return {
        newItem: '',
        boardTabLabel: (boardLabel, boardId) => (h) => {
          const closer = this.isLastBoard ? '' : h('Icon', {
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
      isLastBoard () {
        return this.boards.length === 1
      },
      boards () {
        return this.$store.state.boards.boardsList
      },
      activeBoard: {
        set (value) {
          this.$store.dispatch('setActiveBoard', value)
        },
        get () {
          return this.$store.state.boards.activeBoard
        }
      },
      settings () {
        return this.$store.state.settings
      }
    },
    methods: {
      ...mapActions([
        'showNewBoardModal',
        'hideNewBoardModal',
        'showSettingsModal'
      ]),
      handleDblClick (event) {
        if (event.target.className === 'ivu-tabs-nav-scroll') {
          this.showNewBoardModal()
        }
      },
      open (link) {
        this.$electron.shell.openExternal(link)
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
            this.activeBoard = boardsRepository.getFirstBoard().id
            this.loadBoards()
            this.$Message.info('Board removed')
          }
        })
      },
      saveActiveBoard (boardId) {
        this.activeBoard = boardId
      },
      loadBoards () {
        this.$store.dispatch('fetchBoards')
      },
      importOldEntries () {
        if (!this.settings.wasImported) {
          boardsRepository.importOldEntries()
          settingsRepository.updateAppSettings({'wasImported': true})
        }
      }
    },
    created () {
      this.$store.dispatch('fetchSettings')
      this.importOldEntries()
      this.loadBoards()
      this.$store.dispatch('fetchActiveBoard')
      this.$nextTick().then(() => this.$bus.$emit('appInit', this.selectedTab))
    }
  }
</script>

<style>

  #wrapper {
    height: 100vh;
  }

  #wrapper.fixedTabs {
    margin-top: 35px;
  }

  div.fixedTabs .ivu-tabs-bar {
    position: fixed;
    top: 5px;
    z-index: 100;
    background-color: #fff;
    width: 96vw;
    box-shadow: 0 0 0 6px #ffffff;
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
