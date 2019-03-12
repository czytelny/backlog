<template>
  <div class="board-settings">
    <ShowDoneButton :boardId="boardId"
                    :isBoardItemsEmpty="!boardLength"/>
  </div>
</template>

<script>
  import ShowDoneButton from './ShowDoneButton'

  export default {
    name: 'BoardSettings',
    props: ['boardId', 'boardLength'],
    components: {
      ShowDoneButton
    }
  }
</script>

<style scoped>
  .board-settings {
    display: flex;
    margin-bottom: 8px;
  }
</style>
