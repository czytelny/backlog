<template>
  <div id="app">
    <top-bar></top-bar>
    <MainPage></MainPage>
    <global-keybindings></global-keybindings>
  </div>
</template>

<script>
  import MainPage from './components/MainPage';
  import TopBar from './components/TopBar';
  import './theme/default-theme.less';
  import GlobalKeybindings from './components/GlobalKeyBindings';

  export default {
    name: 'backlog',
    components: {GlobalKeybindings, TopBar, MainPage},
    created () {
      this.$store.dispatch('setupKeyBindings');
    }
  };
</script>

<style lang="scss">
  @import url('~animate.css');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
  }

  body {
    overflow: hidden;
  }

  .invisible {
    opacity: 0;
    transition: opacity .3s;
  }

  .visible {
    opacity: 1;
  }

</style>
