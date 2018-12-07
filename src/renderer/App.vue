<template>
  <div id="app">
     <top-bar></top-bar>
     <MainPage></MainPage>
  </div>
</template>

<script>
  import settingsRepository from '@/repositories/settingsRepository'
  import MainPage from './components/MainPage'
  import TopBar from './components/TopBar'
  import './theme/default-theme.less'

  export default {
    name: 'backlog',
    components: {TopBar, MainPage},
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
    background-color: #f4f4f4;
    overflow: hidden;
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    background-color: rgba(48, 121, 244,.1);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(48, 121, 244,.5);
  }

</style>
