<template>
  <Modal :value="isUpdateModalVisible"
         @on-visible-change="switchFlagIfOpened"
  >
    <h3>
      New version of Backlog is <a href="#" @click="open('http://backlog.cloud/download')">available to download.</a>
    </h3>
    <div slot="footer">
      <Button @click="cancel">Cancel</Button>
      <Button type="ghost" @click="cancelChecking">Don't bother me anymore</Button>

    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'UpdateModal',
    methods: {
      switchFlagIfOpened (isVisible) {
        if (!isVisible) {
          this.cancel()
        }
      },
      cancel () {
        this.$store.dispatch('hideUpdateModal')
      },
      cancelChecking () {
        this.$store.dispatch('setShowUpdates', false)
        this.$store.dispatch('hideUpdateModal')
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
      isUpdateModalVisible () {
        return this.$store.state.modals.update.isVisible && this.$store.state.settings.showUpdates
      }
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
  }
</style>
