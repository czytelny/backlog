<template>
  <div>
    <Input v-model="findItem"
           class="findItem"
           placeholder="Find item..."
           icon="ios-search"
           size="small">
    </Input>
  </div>
</template>

<script>
  export default {
    name: 'FindItem',
    computed: {
      findItem: {
        get () {
          return this.$store.state.boards.findItem.itemText
        },
        set (val) {
          this.$store.dispatch('changeFindItem', val)
        }
      }
    }
  }
</script>

<style scoped>
  .findItem {
    margin: 0 5px;
  }
</style>
