<template>
  <div class="board-content-container">
    <pre>{{ boardId }}</pre>
    <Button type="primary">Primary</Button>
    <ul>
      <li v-for="item in boardItems">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'BoardContent',
    created () {
      this.$store.dispatch('fetchBoard', this.boardId)
    },
    beforeRouteUpdate (to, from, next) {
      console.log(to.params.boardId)
      this.$store.dispatch('fetchBoard', to.params.boardId)
      next()
    },
    computed: {
      boardId () {
        return this.$route.params.boardId
      },
      boardItems () {
        return this.$store.state.boards.boardItems
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
