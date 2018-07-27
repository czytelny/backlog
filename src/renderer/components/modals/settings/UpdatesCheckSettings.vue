<template>
  <div class="row" style="margin-bottom: 20px;">
    <Button :loading="loadingUpdates" @click="loadUpdates" v-if="!newVersionAvailable">
      <span v-if="!loadingUpdates">Check updates</span>
      <span v-else>Checking...</span>
    </Button>
    <Button type="success" v-if="newVersionAvailable"
            @click="open('https://github.com/czytelny/backlog/releases')">New version available
    </Button>
  </div>
</template>

<script>
  import axios from 'axios'

  const version = require('electron').remote.app.getVersion()

  export default {
    name: 'UpdatesCheckSettings',
    data () {
      return {
        loadingUpdates: false,
        newVersionAvailable: false
      }
    },
    methods: {
      loadUpdates () {
        this.loadingUpdates = true
        console.log(`${version}`)
        axios.get('https://api.github.com/repos/czytelny/backlog/releases/latest')
          .then(({data}) => {
            if (`v${version}` === data.tag_name) {
              this.$Message.info('You have the latest version of Backlog')
            } else {
              this.newVersionAvailable = true
            }
          })
          .finally(() => {
            this.loadingUpdates = false
          })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>

</style>