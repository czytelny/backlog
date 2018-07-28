<template>
  <div id="app">
    <top-bar></top-bar>
    <landing-page></landing-page>
    <restart-required-cloak></restart-required-cloak>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import settingsRepository from '@/repositories/settingsRepository'
  import RestartRequiredCloak from './components/RestartRequiredCloak'
  import TopBar from './components/TopBar'

  export default {
    name: 'backlog',
    components: {
      TopBar,
      RestartRequiredCloak,
      LandingPage
    },
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
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('~animate.css');
  @import 'assets/darkTheme.scss';

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    border: 1px solid rgba(90, 99, 118, 0.13);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, sans-serif;
    height: 100vh;
    background-color: #ffffff;
    padding: 10px 0;
    margin-top: 30px;
    overflow: hidden;

    #app {
      overflow: auto;
      height: 90vh;
    }
  }
</style>
