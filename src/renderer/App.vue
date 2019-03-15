<template>
  <div id="app">
    <top-bar></top-bar>
    <MainPage></MainPage>
    <key-map-modal></key-map-modal>
    <global-keybindings></global-keybindings>
  </div>
</template>

<script>
  import settingsRepository from '@/repositories/settingsRepository'
  import MainPage from './components/MainPage'
  import TopBar from './components/TopBar'
  import './theme/default-theme.less'
  import KeyMapModal from './components/modals/KeyMapModal'
  import GlobalKeybindings from './components/GlobalKeybindings'

  export default {
    name: 'backlog',
    components: {GlobalKeybindings, KeyMapModal, TopBar, MainPage},
    data () {
      return {
        settings: null
      }
    },
    created () {
      this.settings = settingsRepository.getAppSettings()
      if (this.settings.darkTheme) {
        document.querySelector('body').classList.add('darkTheme')
      }
    }
  }
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
