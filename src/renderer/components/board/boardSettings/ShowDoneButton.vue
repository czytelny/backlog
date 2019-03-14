<template>
  <div class="showDoneButton">
    <Checkbox :value="showDone"
              size="small"
              @on-change="switchShowDone">
      <span>Show done</span>
    </Checkbox>
<!--    <Button v-if="!showDone"
            size="small"
            type="dashed"
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
    </Button>-->
  </div>

</template>

<script>
  export default {
    name: 'ShowDoneButton',
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
</style>
