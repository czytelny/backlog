<template>
  <div class="board-settings">
    <ShowDoneButton :boardId="boardId"/>
  </div>
</template>

<script>
  import ShowDoneButton from './ShowDoneButton'

  export default {
    name: 'BoardSettings',
    props: ['boardId'],
    components: {
      ShowDoneButton
    }
  }
</script>

<style scoped>
  .board-settings {
    display: flex;
    margin: 4px 0;
  }
</style>
