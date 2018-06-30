<template>
  <div class="db-location">
    <h3>Database Location</h3>
    <Input v-model="settings.dbLocation" disabled="disabled"/>
  </div>
</template>

<script>
  import settingsRepository from '@/repositories/settingsRepository'
  const remote = require('electron').remote

  export default {
    name: 'DatabaseLocation',
    props: ['settings'],
    data () {
      return {
      }
    },
    created () {
      if (!this.settings.dbLocation) {
        settingsRepository.updateAppSettings({dbLocation: remote.getGlobal('userDataPath')})
      }
    }
  }
</script>

<style scoped>
  .db-location{
    margin-bottom: 15px;
  }
</style>