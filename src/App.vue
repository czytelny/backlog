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
  import cloudMixin from './cloudMixin'

  export default {
    name: 'backlog',
    components: {GlobalKeybindings, TopBar, MainPage},
    mixins: [cloudMixin],
    created () {
      this.$store.dispatch('setupKeyBindings');
      this.$store.dispatch('fetchRawBoards');
      // this.syncBoards()
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

  a {
    color: #58BB73;
  }

  a:hover {
    color: #338a62;
  }
</style>
