<template>
  <Modal id="cloud-modal"
         :value="isVisible"
         title="Cloud Integration"
         okText="Ok"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <div v-if="hasToken" style="color: #41B883;">Connected</div>
    <div v-if="connectionError" style="color: #e43436;">Can't connect. Please try again.</div>
    <Input v-model="username"
           placeholder="Email address"
           :disabled="hasToken"
           :autofocus="true"
           style="margin-bottom:8px;"
    />
    <Input v-model="password"
           type="password"
           :disabled="hasToken"
           placeholder="Password"
           @on-keyup.enter="connect"
           style="margin-bottom:8px;"
    />
    <Button type="primary"
            :disabled="isInputsEmpty"
            size="small"
            @click="connect"
            v-if="!hasToken"
    >
      <Icon type="ios-key" v-if="!isConnecting"/>
      <Icon type="ios-loading spin-icon-load" v-if="isConnecting"/>
      Connect
    </Button>


    <Button
      size="small"
      @click="reconnect"
      v-if="hasToken"
    >
      <Icon type="ios-key" v-if="!isConnecting"/>
      <Icon type="ios-loading spin-icon-load" v-if="isConnecting"/>
      Re-connect!
    </Button>

    <Button type="primary"
            size="small"
            @click="initialSyncBoards(); closeModal();"
            style="float:right;"
            v-if="hasToken"
    >
      <Icon type="ios-loading"/>
      Sync All
    </Button>

    <Button style="float:right;"
            v-if="!hasToken"
            size="small"
    >
      ... or create an account
    </Button>
    <div style="margin-top:16px;" v-if="connectionError || syncError">
      <h3>Log</h3>
      <div class="log">
        {{connectionError || syncError}}
      </div>
    </div>
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
        username: this.$store.state.cloud.username || "",
        password: this.$store.state.cloud.username || ""
      };
    },
    computed: {
      connectionError() {
        return this.$store.state.cloud.connectionError;
      },
      syncError() {
        return this.$store.state.cloud.syncError;
      },
      hasToken() {
        return !!this.$store.state.cloud.token;
      },
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
      reconnect() {
        this.$store.dispatch("setCloudToken", {token: "", username: ""});
        this.$store.dispatch("resetSyncQueue");
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
  .log {
    font-family: Consolas, monaco, monospace;
    color: #c7c7c7;
    background: #000;
    border-radius: 4px;
    padding: 16px;
    margin: 4px 0;
    overflow-y: scroll;
    max-height: 300px;
  }

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
