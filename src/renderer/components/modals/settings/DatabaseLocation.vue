<template>
  <div class="db-location">
    <div>Database Location</div>
    <Input v-model="dbLocation" disabled="disabled"/>
  </div>
</template>

<script>
  const remote = require('electron').remote

  export default {
    name: 'DatabaseLocation',
    computed: {
      dbLocation: {
        get () {
          return this.$store.state.settings.dbLocation
        },
        set () {
          // TODO: when implementing customizing db location
        }
      }
    },
    created () {
      if (!this.dbLocation) {
        this.$store.dispatch('setDbLocation', remote.getGlobal('userDataPath'))
      }
    }
  }
</script>

<style scoped>
  .db-location {
    margin-bottom: 15px;
  }
</style>
