<template>
  <div class="main-page">
    <BoardsMenu/>
    <transition
        name="fade"
        mode="out-in"
        duration="50"
    >
      <router-view :key="activeBoardId"/>
    </transition>
    <new-board-modal/>
    <rename-board-modal/>
    <duplicate-board-modal/>
    <find-item-modal/>
    <settings-modal/>
    <key-map-modal/>
    <cloud-modal/>
    <language-modal/>
  </div>
</template>

<script>
  import BoardsMenu from "./menu/Menu";
  import NewBoardModal from "./modals/NewBoardModal";
  import RenameBoardModal from "./modals/RenameBoardModal";
  import SettingsModal from "./modals/settings/SettingsModal";
  import FindItemModal from "./modals/FindItemModal";
  import KeyMapModal from "./modals/keyBindings/KeyMapModal";
  import DuplicateBoardModal from "./modals/DuplicateBoardModal";
  import CloudModal from "./modals/CloudModal";
  import cloudMixin from "./../cloudMixin";
  import LanguageModal from "./modals/LanguageModal";


  export default {
    name: "MainPage",
    mixins: [cloudMixin],
    components: {
      LanguageModal,
      CloudModal,
      DuplicateBoardModal,
      FindItemModal, SettingsModal, RenameBoardModal, NewBoardModal, BoardsMenu, KeyMapModal,
    },
    created() {
      this.$store.dispatch("setSystem", window.navigator.platform.toLowerCase());
      this.$store.dispatch("fetchSettings");
      console.log(this.$store.state.settings.dbLocation);

      // this.versionCheck()
      this.$store.dispatch("fetchBoards");
      if (this.$store.state.settings.token) {
        this.initialSyncBoards();
      }
      if (!this.$store.state.settings.language) {
        this.$store.dispatch("showLanguageModal");
      } else {
        this.$i18n.locale = this.$store.state.settings.language;
      }
      this.$store.dispatch("fetchActiveBoard");
      this.$router.push({path: `/board/${this.activeBoardId}`});
      this.$nextTick().then(() => this.$bus.$emit("appInit", this.selectedTab));
    },
    computed: {
      activeBoardId() {
        return this.$store.state.boards.activeBoard.id;
      },
    },
  };
</script>

<style>
  .main-page {
    display: flex;
    margin-top: 32px;
  }

  .text-uppercase {
    text-transform: uppercase;
  }
</style>
