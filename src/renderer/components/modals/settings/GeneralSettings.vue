<template>
  <div>
    <div class="row">
      <i-switch v-model="markdownMode"
                size="small"
      >
      </i-switch>
      Edit item mode support:
      <transition name="fade" mode="out-in">
        <span v-if="!markdownMode" key="plaintext">
          Plaintext
        </span>
        <span v-if="markdownMode" key="markdown">
          Markdown
        </span>
      </transition>
    </div>

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
      markdownMode: {
        get () {
          return this.$store.state.settings.markdownMode
        },
        set (val) {
          this.$store.dispatch('setMarkdownMode', val)
          this.showSuccessNotification()
        }
      },
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
