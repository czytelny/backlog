<template>
  <div class="topBar">
    <img src="./../assets/icon/logo.svg" alt="Logo" class="logo-icon"/>
    Backlog v{{version}}
    <div class="actionBtn-container">
      <div class="minimize actionBtn"
           @click="minimize">
        <Icon type="ios-remove" size="24"/>
      </div>
      <div class="close actionBtn"
           @click="closeApp">
        <Icon type="ios-close" size="24"/>
      </div>
    </div>
  </div>
</template>

<script>
  const remote = require('electron').remote;

  export default {
    name: 'TopBar',
    computed: {
      version () {
        return this.$store.state.modals.settings.currentVersion;
      }
    },
    methods: {
      closeApp () {
        if (this.$store.state.settings.minimizeToTray) {
          remote.BrowserWindow.getFocusedWindow().hide();
        } else {
          remote.app.quit();
        }
      },
      minimize () {
        if (this.$store.state.settings.minimizeToTray) {
          remote.BrowserWindow.getFocusedWindow().hide();
        } else {
          remote.BrowserWindow.getFocusedWindow().minimize();
        }
      }
    }
  };
</script>

<style scoped>
  .topBar {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px;
    -webkit-transition: all .3s;
    transition: all .3s;
    user-select: none;
    text-align: center;
    font-size: 1em;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    z-index: 100;
    border: 1px solid #e4e4e4;
  }

  .actionBtn-container {
    position: fixed;
    right: 4px;
    top: 2px;
    display: flex;
  }

  .actionBtn {
    -webkit-app-region: no-drag;
    font-size: 16px;
    width: 28px;
    height: 32px;
    text-align: center;
    opacity: .4;
    -webkit-transition: all .3s;
    transition: all .3s;
    color: #272822;
    line-height: 2em;
  }

  .actionBtn:hover {
    opacity: 1;
  }

  .actionBtn.close:hover {
    color: #ed4014
  }

  .logo-icon {
    position: absolute;
    height: 20px;
    margin-left: -24px;
    top: 6px;
  }

</style>
