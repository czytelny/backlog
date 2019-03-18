<template>
  <Modal :value="isVisible"
         fullscreen
         @on-visible-change="visibleChange"
         >
    <div>
      <Input placeholder="Find item text..."
             autofocus="autofocus"
      > </Input>
      <div v-for="board in boards">
        <h1>{{board.label}}</h1>
        <div v-for="item in board.items" class="item">
          {{item.text}}
        </div>
      </div>

    </div>

    <div slot="header" class="header">
      <Icon type="ios-locate-outline"
            size="20"/> Find item...
    </div>

    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">Close</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'FindItemModal',
    computed: {
      isVisible () {
        return this.$store.state.modals.findItem.isVisible
      },
      boards () {
        return this.$store.state.boards.rawBoards
      }
    },
    methods: {
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      closeModal () {
        this.$store.dispatch('hideFindItemModal')
      }
    }
  }
</script>

<style scoped>
  .item {
    margin: 0 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .header {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 0;
  }

  .header i {
    margin-bottom: 4px;
  }
</style>
