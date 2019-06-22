<template>
  <Tooltip style="width: 100%" placement="bottom">
    <Progress :percent="progressCount"
              :stroke-width="8"
              :success-percent="progressCount"
              style="margin-top:8px;"
              hide-info/>
    <div slot="content">
      <span class="done-label">{{doneItemsCount}}</span> {{$t('statusBar.done')}} |
      <span class="pending-label">{{pendingItemsCount}}</span> {{$t('statusBar.pending')}} |
      <span :class="{'done-label': progressCount === 100 }">{{progressCount}}%</span> {{$t('statusBar.done')}}
    </div>
  </Tooltip>
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
    color: rgb(172, 172, 172);
  }

</style>
