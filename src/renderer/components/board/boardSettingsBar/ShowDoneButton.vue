<template>
  <div class="showDoneButton">
    <Checkbox :value="showDone"
              :disabled="isDisabled"
              size="small"
              @on-change="switchShowDone">
      <span>Show done</span>
    </Checkbox>
  </div>

</template>

<script>
  export default {
    name: 'ShowDoneButton',
    props: ['isDisabled'],
    methods: {
      switchShowDone () {
        this.$store.dispatch('switchShowDone',
          {
            boardId: this.$store.state.boards.activeBoard.id,
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
  .showDoneButton {
    user-select: none;
  }
</style>
