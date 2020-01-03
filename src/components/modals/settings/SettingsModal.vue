<template>
  <Modal :value="isVisible"
         :title="$t('modals.settings')"
         @on-ok="closeModal"
         @on-visible-change="visibleChange"
         :okText="$t('common.add')"
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

    <Button @click="changeLanguage" icon="md-globe">
      {{$t('modals.change_app_lang')}}
    </Button>

    <updates-check-settings/>

    <h2>
      {{$t('modals.data')}}
    </h2>
    <database-location/>
    <Button @click="createBackup"
            icon="ios-download-outline"
    >
      {{$t('modals.create_backup')}}
    </Button>
    <Button @click="importBackup"
            icon="ios-arrow-round-up"
    >
      {{$t('modals.import_backup')}}
    </Button>

    <h2>
      {{$t('modals.general_settings')}}
    </h2>
    <general-settings/>

    <div slot="footer">
      <Button size="large" @click="closeModal">
        {{$t('common.close')}}
      </Button>
    </div>
  </Modal>
</template>

<script>
  import boardsRepository from "@/repositories/boardsRepository";
  import GeneralSettings from "./GeneralSettings";
  import UpdatesCheckSettings from "./UpdatesCheckSettings";
  import DatabaseLocation from "./DatabaseLocation";

  const {shell} = require("electron");
  const {dialog} = require("electron").remote;

  export default {
    name: "settings-modal",
    components: {
      DatabaseLocation,
      UpdatesCheckSettings,
      GeneralSettings,
    },
    computed: {
      isVisible() {
        return this.$store.state.modals.settings.isVisible;
      },
      currentVersion() {
        return this.$store.state.modals.settings.currentVersion;
      },
    },
    data() {
      return {};
    },
    methods: {
      open(link) {
        shell.openExternal(link);
      },
      changeLanguage() {
        this.$store.dispatch("showLanguageModal");
      },
      createBackup() {
        const vm = this;
        dialog.showSaveDialog({
          filters: [
            {name: "json", extensions: ["json"]},
          ],
        }, function(fileName) {
          boardsRepository
            .exportDbToJSON(fileName)
            .then(() => {
              vm.$Message.success(this.$t('modals.file_saved_success'));
            })
            .catch((err) => {
              if(fileName == ''){
                return;
              }
              
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      },
      importBackup() {
        const vm = this;
        dialog.showOpenDialog({
          properties: ["openFile"],
          filters: [
            {name: "json", extensions: ["json"]},
          ],
        }, function(filePath) {
          boardsRepository.importDbFromJSON(filePath[0])
            .then(() => {
              vm.$Message.success(vm.$t('modals.file_imported_success'));
              vm.$store.dispatch("fetchBoards");
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      },
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      showSuccessNotification() {
        this.$Message.success(this.$t('modals.setting_updated'));
      },
      closeModal() {
        this.$store.dispatch("hideSettingsModal");
      },
      openSaveDialog(boardId) {
        const vm = this;
        dialog.showSaveDialog({
          filters: [
            {name: "JSON", extensions: ["json"]},
          ],
        }, function(fileName) {
          boardsRepository
            .exportBoardToJSON(fileName, boardId)
            .then(() => {
              vm.$Message.success(this.$t('modals.file_saved_success'));
            })
            .catch((err) => {
              vm.$Message.error({content: err.message, duration: 0, closable: true});
            });
        });
      },
    },
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
