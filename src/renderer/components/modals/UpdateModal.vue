<template>
  <Modal :value="isUpdateModalVisible"
         title="Update is available"
         @on-visible-change="switchFlagIfOpened"
  >
    <h1>New Backlog version is available!</h1>
    <div class="center">
      <Button type="primary"
              size="large"
              icon="ios-download-outline"
              @click="open('http://czytelny.cloud/download')">Download
      </Button>
    </div>

    <div slot="footer">
      <Button @click="cancel">OK</Button>
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
