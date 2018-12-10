<template>
    <div class="boards-actions-row">
      <Tooltip content="Keymap" placement="right" :transfer="true">
        <keyboard-light/>
      </Tooltip>
      <Tooltip content="Cloud Settings" placement="right" :transfer="true">
        <Icon type="ios-cloud" size="16"/>
      </Tooltip>
      <Tooltip content="Application Settings" placement="right" :transfer="true">
        <Icon type="ios-build" size="16"/>
      </Tooltip>
    </div>
</template>

<script>
  import IconSvgBase from './IconSvgBase'
  import KeyboardLight from './icons/KeyboardLight'

  export default {
    name: 'BoardsActionsRow',
    components: {IconSvgBase, KeyboardLight}
  }
</script>

<style scoped>
  .boards-actions-row{
    border-bottom: 1px solid #484848;
    text-align: right;
    padding: 4px 0;
    display: flex;
  }

  i {
    padding-left: 8px;
    cursor: pointer;
  }

  i:hover {
    color: #fff;
  }

  svg {
    cursor: pointer;
    margin-top: 2px;
  }

  svg:hover {
    color: #fff;
  }

</style>
