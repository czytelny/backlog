<template>
  <div>
    <div class="row">
      <Checkbox v-model="itemCreationDate">
        Show creation date for each item
      </Checkbox>
    </div>
  </div>
</template>

<script>
  import {Switch} from 'iview'

  export default {
    name: 'GeneralSettings',
    components: {
      'i-switch': Switch
    },
    computed: {
      darkTheme: {
        get () {
          return this.$store.state.settings.darkTheme
        },
        set (val) {
          this.$store.dispatch('setDarkTheme', val)
          this.showSuccessNotification()
        }
      },
      itemCreationDate: {
        get () {
          return this.$store.state.settings.itemCreationDate
        },
        set (val) {
          this.$store.dispatch('setItemCreationDate', val)
          this.showSuccessNotification()
        }
      }
    },
    methods: {
      showSuccessNotification () {
        this.$Message.success('Setting updated')
        this.$emit('settingsUpdated')
      }
    }
  }
</script>

<style scoped>
  .row {
    margin: 7px 0;
  }
</style>
