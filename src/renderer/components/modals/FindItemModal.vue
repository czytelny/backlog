<template>
  <Modal :value="isVisible"
         fullscreen
         @on-visible-change="visibleChange"
         title="Find item...">
    <div>
      <h1> crazy big modal</h1>
      <p> for finding items. yay.</p>
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

</style>
