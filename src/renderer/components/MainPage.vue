<template>
  <div class="main-page">
    <BoardsMenu></BoardsMenu>
    <router-view :key="activeBoardId"></router-view>
    <new-board-modal></new-board-modal>
    <rename-board-modal></rename-board-modal>
  </div>
</template>

<script>
  import BoardsMenu from './BoardsMenu'
  import BoardContent from './BoardContent'
  import NewBoardModal from './modals/NewBoardModal'
  import RenameBoardModal from './modals/RenameBoardModal'

  export default {
    name: 'MainPage',
    components: {RenameBoardModal, NewBoardModal, BoardContent, BoardsMenu},
    methods: {
      loadBoards () {
        this.$store.dispatch('fetchBoards')
      }
    },
    created () {
      this.$store.dispatch('fetchSettings')
      // this.versionCheck()
      // this.importOldEntries()
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
