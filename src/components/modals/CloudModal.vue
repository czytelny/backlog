<template>
  <Modal id="cloud-modal"
         :value="isVisible"
         title="Cloud Integration"
         okText="Ok"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <Input v-model="username"
           placeholder="Email address"
           :autofocus="true"
           style="margin-bottom:8px;"
    />
    <Input v-model="password"
           type="password"
           placeholder="Password"
           @on-keyup.enter="connect"
           style="margin-bottom:8px;"
    />
    <Button type="primary"
            :disabled="isInputsEmpty"
            size="small"
            @click="connect"
    >
      <Icon type="ios-key" v-if="!isConnecting"/>
      <Icon type="ios-loading spin-icon-load" v-if="isConnecting"/>
      Connect
    </Button>

    <Button style="float:right;" size="small"
    >
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
  import cloudMixin from "./../../cloudMixin";

  export default {
    name: "CloudModal",
    mixins: [cloudMixin],
    data() {
      return {
        username: "",
        password: ""
      };
    },
    computed: {
      isVisible() {
        return this.$store.state.modals.cloud.isVisible;
      },
      isConnecting() {
        return this.$store.state.modals.cloud.isConnecting;
      },
      isInputsEmpty() {
        return !this.username.length || !this.password.length;
      }
    },
    methods: {
      closeModal() {
        this.$store.dispatch("hideCloudModal");
      },
      connect() {
        if (!this.username || !this.password) {
          return;
        }
        this.$store.dispatch("setIsConnecting", true);
        this.login(this.username, this.password);
      },
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      }
    }

  };
</script>

<style scoped>
  .spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
