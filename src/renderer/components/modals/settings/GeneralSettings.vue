<template>
  <div>
    <div class="row">
      <i-switch v-model="prependNewItems"
                size="small">
      </i-switch>
      Default placement of new item:
      <transition name="fade" mode="out-in">
        <span v-if="prependNewItems" key="head">
          Head
        </span>
        <span v-if="!prependNewItems" key="tail">
          Tail
        </span>
      </transition>
    </div>

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
      <Checkbox v-model="darkTheme">
        Dark theme
      </Checkbox>
    </div>

    <div class="row">
      <Checkbox v-model="itemCreationDate">
        Show creation date for each item
      </Checkbox>
    </div>
    <div class="row">
      <Checkbox v-model="stickBoardsOnTop">
        Stick boards list to the top of screen
      </Checkbox>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GeneralSettings',
    computed: {
      prependNewItems: {
        get () {
          return this.$store.state.settings.prependNewItems
        },
        set (val) {
          this.$store.dispatch('setPrependNewItem', val)
          this.showSuccessNotification()
        }
      },
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
          this.$store.dispatch('setRestartRequired')
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
      },
      stickBoardsOnTop: {
        get () {
          return this.$store.state.settings.stickBoardsOnTop
        },
        set (val) {
          this.$store.dispatch('setStickBoardsOnTop', val)
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
