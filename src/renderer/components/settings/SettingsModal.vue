<template>
  <Modal :value="isVisible"
         title="Settings"
         @on-ok="closeSettingsModal"
         :closable="false"
         :mask-closable="false"
         okText="Add"
         :scrollable="true"
  >
    <div class="row title">
      <h1>Backlog</h1>
      <h6>v{{currentVersion}}</h6>
    </div>

    <updates-check-settings/>

    <database-location :settings="settings"/>

    <general-settings :settings="settings"/>

    <div class="separator"></div>
    <h3>Setup board names and order</h3>
    <draggable :list="boardsLocal"
               :options="{handle: '.draggable'}"
               @change="showSuccessNotification">

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
    <div slot="footer">
      <Button size="large" @click="closeSettingsModal">Close</Button>
    </div>
  </Modal>
</template>

<script>
  import draggable from 'vuedraggable'
  import settingsRepository from '@/repositories/settingsRepository'
  import boardsRepository from '@/repositories/boardsRepository'
  import GeneralSettings from './GeneralSettings'
  import UpdatesCheckSettings from './UpdatesCheckSettings'
  import DatabaseLocation from './DatabaseLocation'

  const {dialog} = require('electron').remote
  const version = require('electron').remote.app.getVersion()

  export default {
    name: 'settings-modal',
    props: ['isVisible', 'boards'],
    components: {
      DatabaseLocation,
      UpdatesCheckSettings,
      GeneralSettings,
      draggable
    },
    created () {
      this.updateLocalBoards()
      this.settings = settingsRepository.getAppSettings()
    },
    data () {
      return {
        settings: null,
        currentVersion: version,
        boardsLocal: null
      }
    },
    watch: {
      boards: function (newBoards) {
        this.updateLocalBoards()
      }
    },
    methods: {
      showSuccessNotification () {
        this.$Message.success('Setting updated')
      },
      saveBoards () {
        boardsRepository.saveBoardsArray(this.boardsLocal)
      },
      closeSettingsModal () {
        this.saveBoards()
        this.$emit('closeSettingsModal')
        this.$emit('forceReload')
      },
      updateLocalBoards () {
        this.boardsLocal = JSON.parse(JSON.stringify(this.boards))
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
              vm.$Message.error(err.message)
            })
        })
      }
    }
  }
</script>

<style scoped>
  .row.title {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f3f3f3;
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
