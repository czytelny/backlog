<template>
  <div class="main-page">
    <BoardsMenu/>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view :key="activeBoardId"/>
    </transition>
    <new-board-modal/>
    <rename-board-modal/>
    <!--<settings-modal/>-->
  </div>
</template>

<script>
  import BoardsMenu from './menu/Menu'
  import BoardContent from './board/BoardContent'
  import NewBoardModal from './modals/NewBoardModal'
  import RenameBoardModal from './modals/RenameBoardModal'
  import SettingsModal from './modals/settings/SettingsModal'

  export default {
    name: 'MainPage',
    components: {SettingsModal, RenameBoardModal, NewBoardModal, BoardContent, BoardsMenu},
    methods: {
      loadBoards () {
        this.$store.dispatch('fetchBoards')
      },
      importOldEntries () {
        this.$store.dispatch('importOldEntries')
      }
    },
    created () {
      this.$store.dispatch('fetchSettings')
      // this.versionCheck()
      this.importOldEntries()
      this.loadBoards()
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

<style scoped>
  .main-page {
    display: flex;
    margin-top: 32px;
  }
</style>
