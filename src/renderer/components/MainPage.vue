<template>
  <div class="main-page">
    <BoardsMenu></BoardsMenu>
    <transition name="fade" mode="out-in" :duration="50">
      <router-view :key="activeBoardId"></router-view>
    </transition>
    <new-board-modal></new-board-modal>
    <rename-board-modal></rename-board-modal>
    <input style="display: none;"
           id="inputForActivateNextTab"
           v-shortkey="{win: ['ctrl', 'shift', '}'], win2:['alt', 'shift', '}'], mac:['meta', 'shift', '}']}"
           @shortkey="activateNextTab">
    <input style="display: none;"
           id="inputForActivatePrevTab"
           v-shortkey="{win: ['ctrl', 'shift', '{'], win2:['alt', 'shift', '{'], mac:['meta', 'shift', '{']}"
           @shortkey="activatePreviousTab">
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
      },
      activateNextTab () {
        const activeTabDOM = document.querySelector('a.router-link-active')
        const nextTab = activeTabDOM.parentElement.nextSibling
        if (nextTab) {
          const routePath = nextTab.firstChild.hash.substring(1, nextTab.firstChild.hash.length)
          const boardId = routePath.split('/')[2]
          this.$router.push(routePath)
          this.$store.dispatch('setActiveBoard', boardId)
        }
      },
      activatePreviousTab () {
        const activeTabDOM = document.querySelector('a.router-link-active')
        const prevTab = activeTabDOM.parentElement.previousSibling
        if (prevTab) {
          const routePath = prevTab.firstChild.hash.substring(1, prevTab.firstChild.hash.length)
          const boardId = routePath.split('/')[2]
          this.$router.push(routePath)
          this.$store.dispatch('setActiveBoard', boardId)
        }
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
