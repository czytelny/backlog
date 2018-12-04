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


  @font-face {
    font-family: 'Source Code Pro';
    src: url('theme/fonts/SourceSansPro-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    border: 1px solid rgba(90, 99, 118, 0.13);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Source Code Pro', sans-serif;
    background-color: #ffffff;
    padding: 10px 0;
    margin-top: 26px;
    overflow: hidden;

    #app {
    }
  }

</style>
