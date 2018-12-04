<template>
  <div class="board-row" :class="{'active': isBoardActive}">
    {{label}}
  </div>
</template>

<script>
  export default {
    name: 'BoardRow',
    props: ['boardId', 'label'],
    computed: {
      isBoardActive () {
        return this.$store.state.boards.activeBoard === this.boardId
      }
    }
  }
</script>

<style scoped>
  .board-row {
    padding: 2px 16px;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .board-row:hover {
    color: #fff;
    text-shadow: 0 0 5px #D2DBDE;
  }

  .active {
    color: #fff;
    text-shadow: 0 0 5px #D2DBDE;
  }
</style>
