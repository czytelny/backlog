<template>
  <div class="board-content-container">
    <div v-if="isBoardItemsEmpty" class="info">
      <h1>No items on this board yet</h1>
      <h4>Go ahead and add some!</h4>
    </div>

    <div v-if="isAllItemsDone" class="info">
      <h1>Great, all items are done!</h1>
    </div>

    <div v-if="!filteredBoardItems.length && !isBoardItemsEmpty" class="info">
      <h1>No results...</h1>
    </div>
    <StatusBar :board-items="boardItems" v-if="!isBoardItemsEmpty"></StatusBar>


    <div class="items-container" v-if="!isBoardItemsEmpty">
      <board-item v-for="item in boardItems"
                  :key="item.id"
                  :itemId="item.id"
                  :isDone="item.isDone"
                  :text="item.text"
                  :created="item.created"
                  :boardId="boardId"
      >
      </board-item>
    </div>
  </div>
</template>

<script>
  import BoardItem from '@/components/board/item/BoardItem.vue'
  import StatusBar from '@/components/board/StatusBar'

  export default {
    name: 'BoardContent',
    components: {
      BoardItem,
      StatusBar
    },
    created () {
      this.$store.dispatch('fetchBoard', this.boardId)
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('fetchBoard', to.params.boardId)
      next()
    },
    computed: {
      boardId () {
        return this.$route.params.boardId
      },
      boardItems () {
        return this.$store.state.boards.boardItems
      },
      isBoardItemsEmpty () {
        return !this.boardItems.length
      },
      isAllItemsDone () {
        return this.boardItems.length && !this.boardItems.find(item => !item.isDone)
      },
      filterString () {
        return this.$store.state.boards.findItem.itemText.toLowerCase()
      },
      filteredBoardItems () {
        return this.boardItems.filter((item) => item.text.toLowerCase().includes(this.filterString))
      },
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0
      }
    }
  }
</script>

<style scoped>
  .board-content-container {
    background-color: #f4f4f4;
    padding: 16px;
    width: 80%;
    max-width: 960px;
  }

  .info {
    text-align: center;
    font-size: 1.5em;
    opacity: .25;
    padding: 20px 0;
  }

  .items-container {
    background-color: #ffffff;
    box-shadow: 0 0 8px #dbdfd1;
    padding: 16px;
  }

</style>
