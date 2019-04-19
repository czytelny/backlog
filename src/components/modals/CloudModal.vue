<template>
  <Modal id="cloud-modal"
         :value="isVisible"
         title="Cloud Integration"
         okText="Ok"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <Input v-model="email"
           placeholder="Email address"
           style="margin-bottom:8px;"
           />
    <Input v-model="password"
           type="password"
           placeholder="Password"
           style="margin-bottom:8px;"
    />
    <Button type="primary"
            :disabled="isInputsEmpty"
            icon="ios-key"
    >
      Connect
    </Button>

    <Button style="float:right;">
      ... or create an account
    </Button>

    <div slot="footer">
      <Button size="large"
              @click="closeModal">
        Close
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "CloudModal",
    data() {
      return {
        email: "",
        password: ""
      };
    },
    computed: {
      isVisible() {
        return this.$store.state.modals.cloud.isVisible;
      },
      isInputsEmpty () {
        return !this.email.length || !this.password.length
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
