<template>
  <div class="board-menu-container">
    <boards-title-row></boards-title-row>
    <board-row v-for="board in boards"
               :boardId="board.id"
               :label="board.label"
               :key="board.id">
    </board-row>
  </div>
</template>

<script>
  import BoardRow from './BoardRow'
  import BoardsTitleRow from './BoardsTitleRow'

  export default {
    name: 'BoardsMenu',
    components: {BoardsTitleRow, BoardRow},
    computed: {
      boards () {
        return this.$store.state.boards.boardsList
      }
    }
  }
</script>

<style scoped>
  .board-menu-container {
    background: linear-gradient(to top, #1a1b20 0%,#2d3039 100%);
    height: 100vh;
    width: 20%;
    padding: 16px;
    min-width: 250px;
    color: #A1A1A1;
  }

  .add-board-btn{
    cursor: pointer;
    float:right;
  }

  .boards-title-row {
    color: #fff;
    font-weight: bold;
    margin: 16px 0;
  }
</style>
