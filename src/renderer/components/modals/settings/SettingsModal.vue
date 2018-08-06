<template>
  <Modal :value="isVisible"
         title="Settings"
         @on-ok="closeModal"
         @on-visible-change="visibleChange"
         okText="Add"
         :scrollable="true"
  >
    <div class="row title-row">
      <div class="title">
        <h2>Backlog</h2>
        <h6>v{{currentVersion}}</h6>
      </div>
      <div class="address"
           @click="open('http://www.backlog.cloud')">
        <a href="#">www.backlog.cloud</a>
      </div>
    </div>

    <updates-check-settings/>
    <Collapse v-model="settingsCollapse" accordion>
      <Panel name="0">
        Data
        <p slot="content">
          <database-location/>
          <Button @click="createBackup"
                  icon="ios-download-outline"
          >
            Create backup
          </Button>
          <Button @click="importBackup"
                  icon="ios-upload-outline"
          >
            Import backup
          </Button>
        </p>
      </Panel>
      <Panel name="1">
        General Settings
        <p slot="content">
          <general-settings/>
        </p>
      </Panel>

      <Panel name="2">
        Setup board names and order
        <p slot="content">
          <draggable :list="boardsLocal"
                     :options="{handle: '.draggable'}"
                     @change="boardOrderChanged">

            <div v-for="board in boardsLocal" class="board" :key="board.id">
              <div class="draggable">
                <Icon type="more"
                      class="movable-icon"
                ></Icon>
              </div>
              <Input v-model="board.label" style="width: 300px" @on-blur="saveBoards"/>
              <Tooltip content="Save as a JSON"
                       placement="left"
                       :transfer="true"
              >
                <Icon type="archive" class="download-icon" @click="openSaveDialog(board.id)"></Icon>
              </Tooltip>
            </div>
          </draggable>
        </p>
      </Panel>
    </Collapse>
    <div slot="footer">
      <Button size="large" @click="closeModal">Close</Button>
      <transition name="fade">
        <div class="restart-required" v-if="restartRequired">
          Restart required
        </div>
      </transition>
    </div>
  </Modal>
</template>

<script>
  import draggable from 'vuedraggable'
  import boardsRepository from '@/repositories/boardsRepository'
  import GeneralSettings from './GeneralSettings'
  import UpdatesCheckSettings from './UpdatesCheckSettings'
  import DatabaseLocation from './DatabaseLocation'

  const {dialog} = require('electron').remote

  export default {
    name: 'settings-modal',
    components: {
      DatabaseLocation,
      UpdatesCheckSettings,
      GeneralSettings,
      draggable
    },
    created () {
      this.fetchSettingsBoardsList()
    },
    computed: {
      isVisible () {
        return this.$store.state.modals.settings.isVisible
      },
      currentVersion () {
        return this.$store.state.modals.settings.currentVersion
      },
      restartRequired () {
        return this.$store.state.modals.settings.restartRequired
      }
    },
    data () {
      return {
        boardsLocal: [],
        settingsCollapse: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      createBackup () {
        const vm = this
        dialog.showSaveDialog({
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileName) {
          boardsRepository
            .exportDbToJSON(fileName)
            .then(() => {
              vm.$Message.success('File saved successfully')
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true})
            })
        })
      },
      importBackup () {
        const vm = this
        dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (filePath) {
          boardsRepository.importDbFromJSON(filePath[0])
            .then(() => {
              vm.$Message.success('File imported successfully')
              vm.$store.dispatch('fetchBoards')
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true})
            })
        })
      },
      fetchSettingsBoardsList () {
        this.$store.dispatch('fetchSettingsBoardsList')
          .then(() => {
            this.boardsLocal = JSON.parse(JSON.stringify(this.$store.state.modals.settings.boardsList))
          })
      },
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        } else {
          this.fetchSettingsBoardsList()
        }
      },
      boardOrderChanged () {
        this.$store.dispatch('setRestartRequired')
      },
      showSuccessNotification () {
        this.$Message.success('Setting updated')
      },
      saveBoards () {
        this.$store.dispatch('saveBoardsArray', this.boardsLocal)
      },
      closeModal () {
        if (this.restartRequired) {
          this.saveBoards()
          this.$store.dispatch('showRestartReqCloak')
          this.$store.dispatch('hideSettingsModal')
        } else {
          this.$store.dispatch('hideSettingsModal')
        }
      },
      openSaveDialog (boardId) {
        const vm = this
        dialog.showSaveDialog({
          filters: [
            {name: 'JSON', extensions: ['json']}
          ]
        }, function (fileName) {
          boardsRepository
            .exportBoardToJSON(fileName, boardId)
            .then(() => {
              vm.$Message.success('File saved successfully')
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true})
            })
        })
      }
    }
  }
</script>

<style scoped>
  .restart-required {
    font-size: 1em;
    color: #ff9900;
  }

  .row.title-row {
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-size: 1.5em;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }

  .address{
    text-align: center;
    font-size: .5em;
    cursor: pointer;
  }

  .download-icon {
    cursor: pointer;
    margin-left: 5px;
    font-size: 1.5em;
  }

  h4 {
    margin: 5px 0;
  }

  .row {
    margin: 7px 0;
  }

  .board {
    position: relative;
    margin: 2px 0;
    padding: 2px;
    transition: all .3s;
  }

  .separator {
    border-bottom: 1px solid #f5f5f5;
    margin: 15px 0
  }

  .movable-icon {
    position: absolute;
    top: 2px;
    left: 3px;
    transform: rotate(90deg);
    font-size: 2em;
    opacity: .1;
    transition: all .25s;
    color: #41B883;
  }

  .draggable:hover .movable-icon {
    opacity: .8;
  }
</style>
