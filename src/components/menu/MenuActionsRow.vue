<template>
  <div class="menu-actions-row">
    <Tooltip :content="keymapShortcutString" placement="bottom" :transfer="true" class="tooltip-height">
        <span @click="showKeymap">
            <img src="./../../assets/icon/keymap.svg" alt="Keymap" class="action-icon"/>
        </span>
    </Tooltip>

    <Tooltip content="Synchronization..."
             placement="bottom"
             v-if="showIsSyncing"
             :transfer="true"
             class="tooltip-height">
      <CloudSyncIcon class="action-icon"/>
    </Tooltip>

    <Tooltip content="Cloud - not connected"
             placement="bottom"
             v-if="showNotConnectedIcon"
             :transfer="true"
             class="tooltip-height">
      <img src="./../../assets/icon/cloud_unset.svg"
           @click="showCloudModal"
           alt="Cloud Integration - not connected"
           class="action-icon"/>
    </Tooltip>

    <Tooltip content="Cloud Connected"
             placement="bottom"
             v-if="showConnectedIcon"
             :transfer="true"
             class="tooltip-height">
      <img src="./../../assets/icon/cloud_connected.svg"
           @click="showCloudModal"
           alt="Cloud Integration - connected"
           class="action-icon"/>
    </Tooltip>

    <Tooltip content="Connection Error"
             placement="bottom"
             v-if="showConnectionErrorIcon"
             :transfer="true"
             class="tooltip-height">
      <img src="./../../assets/icon/cloud_error.svg"
           @click="showCloudModal"
           alt="Cloud Integration - connection error"
           class="action-icon"/>
    </Tooltip>

    <Tooltip content="Application Settings"
             placement="bottom"
             :transfer="true"
             class="tooltip-height">
      <img src="./../../assets/icon/settings.svg"
           alt="Keymap"
           class="action-icon"
           @click="showSettingsModal"/>
    </Tooltip>
  </div>
</template>

<script>
  import keyShortcutMixin from "./../../keyShortcutStringMixin";
  import CloudSyncIcon from "./../../assets/icon/CloudSyncIcon";

  export default {
    name: "MenuActionsRow",
    mixins: [keyShortcutMixin],
    components: {CloudSyncIcon},
    computed: {
      showNotConnectedIcon() {
        return !this.hasToken && !this.connectionError && !this.showIsSyncing;
      },
      showConnectedIcon() {
        return this.hasToken && !this.connectionError && !this.showIsSyncing;
      },
      showConnectionErrorIcon() {
        return this.connectionError && !this.showIsSyncing;
      },
      showIsSyncing() {
        return this.isSyncing;
      },
      isSyncing() {
        return this.$store.state.cloud.syncInProgress
      },
      connectionError() {
        return this.$store.state.cloud.connectionError;
      },
      hasToken() {
        return !!this.$store.state.cloud.token;
      },
      keymapShortcutString() {
        return `Keymap - ${this.shortcutString("showKeymap")}`;
      }
    },
    methods: {
      showKeymap() {
        this.$store.dispatch("showKeymapModal");
      },
      showSettingsModal() {
        this.$store.dispatch("showSettingsModal");
      },
      showCloudModal() {
        this.$store.dispatch("showCloudModal");
      }
    }
  };
</script>

<style scoped>
  .menu-actions-row {
    padding: 8px 32px;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
    background-color: #404c5a;
    width: 100%;
    user-select: none;
  }

  .tooltip-height {
    height: 24px;
  }

  .action-icon {
    color: #2C2E32;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    opacity: .6;
    cursor: pointer;
    filter: drop-shadow(0 0 2px rgba(70, 70, 70, 0.8));
  }

  .action-icon:hover {
    opacity: 1;
    color: #2C2E32;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
  }

  i {
    padding-left: 8px;
    cursor: pointer;
  }

  i:hover {
    color: #fff;
  }

  svg {
    cursor: pointer;
    margin-top: 2px;
  }

  svg:hover {
    color: #fff;
  }

</style>
