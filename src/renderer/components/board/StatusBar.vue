<template>
  <div class="status-bar">
    <span class="done-label">{{doneItemsCount}}</span> done |
    <span class="pending-label">{{pendingItemsCount}}</span> pending
    <span v-if="boardItems.length"><span class="progress-label">| {{progressCount}}</span>% completed</span>
  </div>
</template>

<script>
  export default {
    name: 'StatusBar',
    props: ['boardItems'],
    computed: {
      doneItemsCount () {
        return this.boardItems.filter(item => item.isDone === true).length
      },
      progressCount () {
        return Math.round((this.doneItemsCount / this.boardItems.length) * 100)
      },
      pendingItemsCount () {
        return this.boardItems.length - this.doneItemsCount
      }
    }
  }
</script>

<style scoped>
  .done-label {
    color: #41B883;
  }

  .pending-label {
    color: rgb(44, 133, 229);
  }

  .status-bar {
    font-size: .8em;
    color: #494c3e;
    border-bottom: 1px solid rgba(206, 206, 206, 0.25);
  }
</style>
