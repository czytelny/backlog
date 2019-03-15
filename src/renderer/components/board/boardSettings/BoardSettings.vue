<template>
  <div class="board-settings">
    <Find-item/>
    <ShowDoneButton/>
    <BoardCompletionBtn/>
  </div>
</template>

<script>
  import ShowDoneButton from './ShowDoneButton'
  import BoardCompletionBtn from './BoardCompletionBtn'
  import FindItem from './FilterItems'

  export default {
    name: 'BoardSettings',
    props: ['boardId'],
    components: {
      FindItem,
      BoardCompletionBtn,
      ShowDoneButton
    }
  }
</script>

<style scoped>
  .board-settings {
    display: flex;
    margin: 4px 0;
    align-items: center;
    justify-content: space-between;
  }
</style>
