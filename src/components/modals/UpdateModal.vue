<template>
  <Modal :value="isUpdateModalVisible"
         @on-visible-change="switchFlagIfOpened"
  >
    <h3>
       <a href="#" @click="open('http://backlog.cloud/download')">{{$t("modals.download")}}.</a>
    </h3>
    <div slot="footer">
      <Button @click="cancel">{{$t("common.cancel")}}</Button>
      <Button type="ghost" @click="cancelChecking">{{$t("modals.dont_bother_me")}}</Button>

    </div>
  </Modal>
</template>

<script>
  const { shell } = require('electron');

  export default {
    name: 'UpdateModal',
    methods: {
      switchFlagIfOpened (isVisible) {
        if (!isVisible) {
          this.cancel();
        }
      },
      cancel () {
        this.$store.dispatch('hideUpdateModal');
      },
      cancelChecking () {
        this.$store.dispatch('setShowUpdates', false);
        this.$store.dispatch('hideUpdateModal');
      },
      open (link) {
        shell.openExternal(link);
      }
    },
    computed: {
      isUpdateModalVisible () {
        return this.$store.state.modals.update.isVisible && this.$store.state.settings.showUpdates;
      }
    }
  };
</script>

<style scoped>
  .center {
    text-align: center;
  }
</style>
