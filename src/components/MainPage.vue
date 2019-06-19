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
    <key-map-modal></key-map-modal>
    <cloud-modal></cloud-modal>
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

  export default {
    name: "MainPage",
    components: {
      CloudModal,
      DuplicateBoardModal,
      FindItemModal, SettingsModal, RenameBoardModal, NewBoardModal, BoardsMenu, KeyMapModal
    },
    created() {
      this.$store.dispatch("setSystem", window.navigator.platform.toLowerCase());
      this.$store.dispatch("fetchSettings");
      console.log(this.$store.state.settings.dbLocation);

      // this.versionCheck()
      this.$store.dispatch("fetchBoards");
      if (this.$store.state.settings.token) {
        this.$store.dispatch("syncGetBoards", {
          username: this.$store.state.settings.username,
          token: this.$store.state.settings.token,
          rawBoards: this.$store.state.boards.rawBoards
        });
      }
      this.$store.dispatch("fetchActiveBoard");
      this.$router.push({path: `/board/${this.activeBoardId}`});
      this.$nextTick().then(() => this.$bus.$emit("appInit", this.selectedTab));
    },
    computed: {
      activeBoardId() {
        return this.$store.state.boards.activeBoard.id;
      }
    }
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
