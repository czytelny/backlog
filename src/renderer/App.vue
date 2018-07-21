<template>
  <div id="app">
    <landing-page></landing-page>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import settingsRepository from '@/repositories/settingsRepository'

  export default {
    name: 'backlog',
    components: {
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

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, sans-serif;
    height: 100vh;
    background-color: #ffffff;
    padding: 10px 0;
  }
</style>
