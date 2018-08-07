<template>
  <div class="topBar">
    Backlog v{{version}}
    <div class="actionBtn-container">
      <div class="minimize actionBtn"
           @click="minimize">
        <Icon type="ios-minus-outline"></Icon>
      </div>
      <div class="close actionBtn"
           @click="closeApp">
        <Icon type="ios-close-outline"></Icon>
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
    height: 30px;
    position: fixed;
    z-index: -1;
    top: 1px;
    left: 1px;
    width: 100%;
    padding: 5px;
    -webkit-transition: all .3s;
    transition: all .3s;
    user-select: none;
    text-align: center;
    font-size: 1.1em;
    border-bottom: 1px solid #f9f9f9;
  }

  .actionBtn-container {
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
  }

  .actionBtn {
    -webkit-app-region: no-drag;
    font-size: 16px;
    width: 25px;
    height: 30px;
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
    color: #c5281b;
  }

</style>
