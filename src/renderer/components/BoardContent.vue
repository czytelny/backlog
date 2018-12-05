<template>
  <div class="board-content-container">
    <h1>{{ boardId }}</h1>
    <Button type="primary">Primary</Button>
  </div>
</template>

<script>
  export default {
    name: 'BoardContent',
    computed: {
      boardId () {
        return this.$route.params.boardId
      }
    }
  }
</script>

<style scoped>
  .board-content-container {
    background-color: #fafafa;
    padding: 16px;
    width: 80%
  }

</style>
