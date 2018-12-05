<template>
  <div class="main-page">
    <BoardsMenu></BoardsMenu>
    <BoardContent></BoardContent>
    <new-board-modal @newBoardSubmitted="loadBoards"></new-board-modal>
  </div>
</template>

<script>
  import BoardsMenu from './BoardsMenu'
  import BoardContent from './BoardContent'
  import NewBoardModal from './modals/NewBoardModal'

  export default {
    name: 'MainPage',
    components: {NewBoardModal, BoardContent, BoardsMenu},
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
      this.$nextTick().then(() => this.$bus.$emit('appInit', this.selectedTab))
    }
  }
</script>

<style scoped>
  .main-page {
    display: flex;
    margin-top: 32px;
  }
</style>
