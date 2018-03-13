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
    <h4>General settings</h4>
    <div class="row">
      <i-switch v-model="settings.prependNewItems"
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
    <div class="separator"></div>
    <h4>Setup board names and order</h4>
    <draggable :list="boardsLocal">
      <div v-for="board in boardsLocal" class="board" :key="board.id">
        <Icon type="minus-round" class="movable-icon"></Icon>
        <Input v-model="board.label" style="width: 300px" @on-blur="saveBoards"/>
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
  import { version } from './../../../package.json'
  import axios from 'axios'

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
      },
      saveItemCreationDate () {
        settingsRepository.updateAppSettings({itemCreationDate: this.settings.itemCreationDate})
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

  h4 {
    margin: 5px 0;
  }

  .row {
    margin: 5px 0;
  }

  .board {
    position: relative;
    margin: 2px 0;
    padding: 2px;
    cursor: move;
    transition: all .3s;
  }

  .board:hover .movable-icon {
    opacity: .55;
  }

  .separator {
    border-bottom: 1px solid #f5f5f5;
    margin: 15px 0
  }
</style>
