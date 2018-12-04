<template>
  <div class="board-menu-container">
    <div class="boards-title-row">
      BOARDS
    </div>
    <board-row v-for="board in boards"
               :boardId="board.id"
               :label="board.label"
               :key="board.id">
    </board-row>
  </div>
</template>

<script>
  import BoardRow from './BoardRow'

  export default {
    name: 'BoardsMenu',
    components: {BoardRow},
    computed: {
      boards () {
        return this.$store.state.boards.boardsList
      }
    }
  }
</script>

<style scoped>
  .board-menu-container {
    background-color: #484848;
    height: 100vh;
    width: 20%;
    padding: 16px;
    min-width: 250px;
    color: #A1A1A1;
  }

  .boards-title-row {
    color: #fff;
    font-weight: bold;
  }
</style>
