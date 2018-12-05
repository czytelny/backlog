<template>
  <div class="boards-title-row">
    BOARDS
    <Tooltip content="Add New Board" class="add-icon-container">
      <Icon type="ios-add"
            size="18"
            class="add-icon"
            @click="showNewBoardModal"/>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'BoardsTitleRow',
    methods: {
      showNewBoardModal () {
        this.$store.dispatch('showNewBoardModal')
      }
    }
  }
</script>

<style scoped>
  .boards-title-row {
    user-select: none;
  }

  .add-icon-container {
    float: right;
  }

  .add-icon {
    color: #cecece;
    padding-bottom: 2px;
    cursor: pointer;
    transition: all .3s;
  }

  .add-icon:hover {
    color: #fff;
    text-shadow: 0 0 5px #D2DBDE;
  }

</style>
