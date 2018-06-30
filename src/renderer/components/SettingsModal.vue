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

    <div class="row" style="margin-bottom: 20px;">
      <Button :loading="loadingUpdates" @click="loadUpdates" v-if="!newVersionAvailable">
        <span v-if="!loadingUpdates">Check updates</span>
        <span v-else>Checking...</span>
      </Button>
      <Button type="success" v-if="newVersionAvailable"
              @click="open('https://github.com/czytelny/backlog/releases')">New version available
      </Button>
    </div>
    <h3>General settings</h3>
    <div class="row">
      <i-switch v-model="settings.prependNewItems"
                size="small"
                @on-change="savePrependNewItems()"
      >
      </i-switch>
      Default placement of new item:
      <transition name="fade" mode="out-in">
        <span v-if="settings.prependNewItems" key="head">
          Head
        </span>
        <span v-if="!settings.prependNewItems" key="tail">
          Tail
        </span>
      </transition>
    </div>
    <div class="row">
      <Checkbox v-model="settings.itemCreationDate" @on-change="saveItemCreationDate">
        Show creation date for each item
      </Checkbox>
    </div>
    <div class="row">
      <Checkbox v-model="settings.stickBoardsOnTop" @on-change="saveStickBoardsOnTop">
        Stick boards list to the top of screen
      </Checkbox>
    </div>
    <div class="row">
      <i-switch v-model="settings.markdownMode"
                size="small"
                @on-change="saveMarkdownMode()"
      >
      </i-switch>
      Edit item mode support:
      <transition name="fade" mode="out-in">
        <span v-if="!settings.markdownMode" key="html">
          HTML
        </span>
        <span v-if="settings.markdownMode" key="markdown">
          Markdown
        </span>
      </transition>
    </div>
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
  import axios from 'axios'

  const {dialog} = require('electron').remote
  const version = require('electron').remote.app.getVersion()

  export default {
    name: 'settings-modal',
    props: ['isVisible', 'boards'],
    components: {
      draggable
    },
    created () {
      this.updateLocalBoards()
      this.settings = settingsRepository.getAppSettings()
    },
    data () {
      return {
        settings: null,
        newVersionAvailable: false,
        currentVersion: version,
        loadingUpdates: false,
        boardsLocal: null
      }
    },
    watch: {
      boards: function (newBoards) {
        this.updateLocalBoards()
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      loadUpdates () {
        this.loadingUpdates = true
        console.log(`${version}`)
        axios.get('https://api.github.com/repos/czytelny/backlog/releases/latest')
          .then(({data}) => {
            if (`v${version}` === data.tag_name) {
              this.$Message.info('You have the latest version of Backlog')
            } else {
              this.newVersionAvailable = true
            }
          })
          .finally(() => {
            this.loadingUpdates = false
          })
      },
      savePrependNewItems () {
        settingsRepository.updateAppSettings({prependNewItems: this.settings.prependNewItems})
        this.showSuccessNotification()
      },
      saveItemCreationDate () {
        settingsRepository.updateAppSettings({itemCreationDate: this.settings.itemCreationDate})
        this.showSuccessNotification()
      },
      saveStickBoardsOnTop () {
        settingsRepository.updateAppSettings({stickBoardsOnTop: this.settings.stickBoardsOnTop})
        this.showSuccessNotification()
      },
      saveMarkdownMode () {
        settingsRepository.updateAppSettings({markdownMode: this.settings.markdownMode})
        this.showSuccessNotification()
      },
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
