<template>
  <div class="topBar">
    Backlog v{{version}}
    <div class="actionBtn-container">
      <div class="minimize actionBtn"
           @click="minimize">
        <i class="el-icon-minus"></i>
      </div>
      <div class="close actionBtn"
           @click="closeApp">
        <i class="el-icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  const remote = require('electron').remote

  export default {
    name: 'TopBar',
    computed: {
      version () {
        return this.$store.state.modals.settings.currentVersion
      }
    },
    methods: {
      closeApp () {
        remote.app.quit()
      },
      minimize () {
        remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }
  }
</script>

<style scoped>
  .topBar {
    -webkit-app-region: drag;
    background-color: #ffffff;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    padding: 8px;
    -webkit-transition: all .3s;
    transition: all .3s;
    user-select: none;
    text-align: center;
    font-size: 1em;
    border-bottom: 1px solid #c7c7c7;
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

</style>
