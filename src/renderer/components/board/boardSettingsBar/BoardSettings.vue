<template>
  <div class="board-settings">
    <Find-item :isDisabled="isDisabled"/>
    <ShowDoneButton :isDisabled="isDisabled"/>
    <ShowProgressBtn :isDisabled="isDisabled"/>
  </div>
</template>

<script>
  import ShowDoneButton from './ShowDoneButton'
  import ShowProgressBtn from './ShowProgressBtn'
  import FindItem from './FilterItems'

  export default {
    name: 'BoardSettings',
    props: ['boardId', 'isDisabled'],
    components: {
      FindItem,
      ShowProgressBtn,
      ShowDoneButton
    }
  }
</script>

<style scoped>
  .board-settings {
    display: flex;
    margin: 4px 0;
    align-items: center;
    justify-content: space-between;
  }
</style>
