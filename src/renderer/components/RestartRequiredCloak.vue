<template>
  <transition name="fade">
    <div id="restart-cloak" v-if="restartReqCloak">
      <h1 v-if="!restartCountdownIsZero">App will restart in {{restartCountdown}}...</h1>
      <h1 v-if="restartCountdownIsZero">Restarting!</h1>
    </div>
  </transition>
</template>

<script>
  const remote = require('electron').remote

  export default {
    name: 'RestartRequiredCloak',
    computed: {
      restartReqCloak () {
        return this.$store.state.modals.settings.restartReqCloak
      },
      restartCountdown () {
        return this.$store.state.modals.settings.restartCountdown
      },
      restartCountdownIsZero () {
        return this.restartCountdown === 0
      }
    },
    watch: {
      restartReqCloak () {
        if (this.restartReqCloak === true) {
          this.startCountdown()
        }
      }
    },
    methods: {
      startCountdown () {
        const interval = setInterval(() => {
          if (this.restartCountdownIsZero) {
            clearInterval(interval)
            remote.app.relaunch()
            remote.app.quit()
          } else {
            this.$store.dispatch('decreaseRestartCountdown')
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  #restart-cloak {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    left: 0;
    top: 0;
    color: white;
    font-size: 3em;
    text-align: center;
    padding-top: 15%;
    z-index: 100;
  }
</style>
