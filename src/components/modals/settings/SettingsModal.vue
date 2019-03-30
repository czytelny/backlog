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

    <h2>Data</h2>
    <database-location/>
    <Button @click="createBackup"
            icon="ios-download-outline"
    >
      Create backup
    </Button>
    <Button @click="importBackup"
            icon="ios-arrow-round-up"
    >
      Import backup
    </Button>

    <h2>General Settings</h2>
    <general-settings/>

    <div slot="footer">
      <Button size="large" @click="closeModal">Close</Button>
    </div>
  </Modal>
</template>

<script>
  import boardsRepository from '@/repositories/boardsRepository';
  import GeneralSettings from './GeneralSettings';
  import UpdatesCheckSettings from './UpdatesCheckSettings';
  import DatabaseLocation from './DatabaseLocation';

  const {dialog} = require('electron').remote;

  export default {
    name: 'settings-modal',
    components: {
      DatabaseLocation,
      UpdatesCheckSettings,
      GeneralSettings
    },
    computed: {
      isVisible () {
        return this.$store.state.modals.settings.isVisible;
      },
      currentVersion () {
        return this.$store.state.modals.settings.currentVersion;
      }
    },
    data () {
      return {};
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link);
      },
      createBackup () {
        const vm = this;
        dialog.showSaveDialog({
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileName) {
          boardsRepository
            .exportDbToJSON(fileName)
            .then(() => {
              vm.$Message.success('File saved successfully');
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      },
      importBackup () {
        const vm = this;
        dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (filePath) {
          boardsRepository.importDbFromJSON(filePath[0])
            .then(() => {
              vm.$Message.success('File imported successfully');
              vm.$store.dispatch('fetchBoards');
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      },
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      showSuccessNotification () {
        this.$Message.success('Setting updated');
      },
      closeModal () {
        this.$store.dispatch('hideSettingsModal');
      },
      openSaveDialog (boardId) {
        const vm = this;
        dialog.showSaveDialog({
          filters: [
            {name: 'JSON', extensions: ['json']}
          ]
        }, function (fileName) {
          boardsRepository
            .exportBoardToJSON(fileName, boardId)
            .then(() => {
              vm.$Message.success('File saved successfully');
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      }
    }
  };
</script>

<style scoped>
  h2 {
    margin-top: 16px;
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

  .address {
    text-align: center;
    font-size: .5em;
    cursor: pointer;
  }

  h4 {
    margin: 5px 0;
  }

  .row {
    margin: 7px 0;
  }

</style>
