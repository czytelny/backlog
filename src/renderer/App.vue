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


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
  }

  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    background-color: #ffffff;
    padding: 10px 0;
    margin-top: 26px;
    overflow: hidden;

  }

</style>
