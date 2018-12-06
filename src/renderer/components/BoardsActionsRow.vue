<template>
    <div class="boards-actions-row">
      <Tooltip content="Cloud Settings" placement="right">
        <Icon type="ios-cloud" size="16"/>
      </Tooltip>
      <Tooltip content="Application Settings" placement="right">
        <Icon type="ios-build" size="16"/>
      </Tooltip>
    </div>
</template>

<script>
  export default {
    name: 'BoardsActionsRow'
  }
</script>

<style scoped>
  .boards-actions-row{
    border-bottom: 1px solid #484848;
    text-align: right;
    padding: 4px 0;
  }

  i {
    padding-left: 8px;
    cursor: pointer;
  }

  i:hover {
    color: #fff;
  }

</style>
