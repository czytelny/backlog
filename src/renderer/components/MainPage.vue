<template>
  <div class="main-page">
      <BoardsMenu></BoardsMenu>
    <BoardContent></BoardContent>
  </div>
</template>

<script>
  import BoardsMenu from './BoardsMenu'
  import BoardContent from './BoardContent'
  export default {
    name: 'MainPage',
    components: {BoardContent, BoardsMenu},
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
  .main-page{
    display: flex;
  }
</style>
