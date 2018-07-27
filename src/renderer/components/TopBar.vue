<template>
  <div class="topBar" :class="{'darkTheme': darkTheme}">
    Backlog v.{{version}}
    <div class="closeBtn">
      <Icon type="ios-close-outline"></Icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopBar',
    computed: {
      darkTheme () {
        return this.$store.state.settings.darkTheme
      },
      version () {
        return this.$store.state.modals.settings.currentVersion
      }
    }
  }
</script>

<style scoped>
  .topBar {
    -webkit-app-region: drag;
    background-color: #f6f6f6;
    height: 30px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 5px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .closeBtn {
    -webkit-app-region: no-drag;
    position: fixed;
    right: 0;
    top: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    cursor: pointer;
    width: 40px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    opacity: .5;
    color: #272822;
  }

  .closeBtn:hover {
    opacity: 1;
  }

</style>
