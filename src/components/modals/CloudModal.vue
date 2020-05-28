<template>
  <Modal id="cloud-modal"
         :value="isVisible"
         :title="$t('cloud.cloud_integration')"
         okText="Ok"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <div v-if="hasToken && hasNoSyncError" style="color: #41B883;">
      {{$t("cloud.connected")}}
    </div>
    <div v-if="hasToken && !hasNoSyncError" style="color: #e43436;">
      {{$t("cloud.error_occurred")}}
    </div>
    <div v-if="connectionError" style="color: #e43436;">
      {{$t("cloud.cant_connect")}}
    </div>
    <Input v-model="username"
           :placeholder="$t('cloud.email_address')"
           :disabled="hasToken"
           :autofocus="true"
           style="margin-bottom:8px;"
    />
    <Input v-model="password"
           type="password"
           :disabled="hasToken"
           :placeholder="$t('cloud.password')"
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
      {{$t("cloud.connect")}}
    </Button>


    <Button
        size="small"
        @click="reconnect"
        v-if="hasToken"
    >
      <Icon type="ios-key" v-if="!isConnecting"/>
      <Icon type="ios-loading spin-icon-load" v-if="isConnecting"/>
      {{$t("cloud.reconnect")}}
    </Button>

    <Button type="primary"
            size="small"
            @click="initialSyncBoards(); closeModal();"
            style="float:right;"
            v-if="hasToken"
    >
      <Icon type="ios-loading"/>
      {{$t("cloud.sync_all")}}
    </Button>

    <Button style="float:right;"
            v-if="!hasToken"
            size="small"
            @click="createAccount"
    >
      {{$t("cloud.or_create_account")}}
    </Button>
    <div style="margin-top:16px;" v-if="connectionError || syncError">
      <h3>
        {{$t("cloud.logs")}}
      </h3>
      <div class="log">
        {{connectionError || syncError}}
      </div>
    </div>
    <div slot="footer">
      <Button size="large"
              @click="closeModal">
        {{$t("common.close")}}
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
        password: this.$store.state.cloud.username || "",
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
      hasNoSyncError() {
        return !this.$store.state.cloud.syncError;
      },
      isVisible() {
        return this.$store.state.modals.cloud.isVisible;
      },
      isConnecting() {
        return this.$store.state.modals.cloud.isConnecting;
      },
      isInputsEmpty() {
        return !this.username.length || !this.password.length;
      },
    },
    methods: {
      createAccount() {
        this.$Message.error("Sorry it's not ready yet!");
      },
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
      },
    },

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
