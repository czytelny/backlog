<template>
  <div class="showDoneButton">
    <Button v-if="!showDone"
            size="small"
            type="text"
            icon="ios-checkmark-circle-outline"
            @click="switchShowDone">
      Show done
    </Button>
    <Button v-if="showDone"
            size="small"
            type="text"
            icon="ios-remove-circle-outline"
            @click="switchShowDone">
      Hide done
    </Button>
  </div>

</template>

<script>
  export default {
    name: 'ShowDoneButton',
    props: ['boardId'],
    methods: {
      switchShowDone () {
        console.log(this.showDone)
        this.$store.dispatch('switchShowDone',
          {
            boardId: this.boardId,
            showDone: !this.showDone
          })
      }
    },
    computed: {
      showDone () {
        return this.$store.state.boards.activeBoard.showDone
      }
    }
  }
</script>

<style scoped>
</style>
