<template>
  <div class="board-content-container">
    <div class="items-container">
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

  export default {
    name: 'BoardContent',
    components: {
      BoardItem
    },
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
    background-color: #f4f4f4;
    padding: 16px;
    width: 80%;
    max-width: 960px;
  }

  .items-container {
    background-color: #ffffff;
    box-shadow: 0 0 8px #dbdfd1;
    padding: 16px;
  }

</style>
