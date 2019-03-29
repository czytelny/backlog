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
    <find-item-modal/>
    <settings-modal/>
    <key-map-modal></key-map-modal>
  </div>
</template>

<script>
  import BoardsMenu from './menu/Menu'
  import BoardContent from './board/BoardContent'
  import NewBoardModal from './modals/NewBoardModal'
  import RenameBoardModal from './modals/RenameBoardModal'
  import SettingsModal from './modals/settings/SettingsModal'
  import FindItemModal from './modals/FindItemModal'
  import KeyMapModal from './modals/keyBindings/KeyMapModal'

  export default {
    name: 'MainPage',
    components: {FindItemModal, SettingsModal, RenameBoardModal, NewBoardModal, BoardContent, BoardsMenu, KeyMapModal},
    created () {
      console.log('mainpage.vue')

      this.$store.dispatch('setSystem', window.navigator.platform.toLowerCase())
      this.$store.dispatch('fetchSettings')
      console.log(this.$store.state.settings.dbLocation)

      // this.versionCheck()
      this.$store.dispatch('importOldEntries')
      this.$store.dispatch('fetchBoards')
      this.$store.dispatch('fetchActiveBoard')
      this.$router.push({path: `/board/${this.activeBoardId}`})
      this.$nextTick().then(() => this.$bus.$emit('appInit', this.selectedTab))
    },
    computed: {
      activeBoardId () {
        return this.$store.state.boards.activeBoard.id
      }
    }
  }
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
