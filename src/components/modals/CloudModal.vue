<template>
  <Modal id="cloud-modal"
         :value="isVisible"
         title="Cloud Integration"
         okText="Ok"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <h1>integrate with cloud</h1>
    <div slot="footer">
      <Button type="primary"
              size="large"
              @click="closeModal">
        Close
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "CloudModal",
    computed: {
      isVisible() {
        return this.$store.state.modals.cloud.isVisible;
      }
    },
    methods: {
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideCloudModal");
      }
    }

  };
</script>

<style scoped>

</style>
