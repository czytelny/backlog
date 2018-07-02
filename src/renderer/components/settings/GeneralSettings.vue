<template>
  <div>
    <div class="row">
      <h3>General settings</h3>
      <i-switch :value="settings.prependNewItems"
                size="small"
                @on-change="savePrependNewItems"
      >
      </i-switch>
      Default placement of new item:
      <transition name="fade" mode="out-in">
        <span v-if="settings.prependNewItems" key="head">
          Head
        </span>
        <span v-if="!settings.prependNewItems" key="tail">
          Tail
        </span>
      </transition>
    </div>
    <div class="row">
      <i-switch :value="settings.markdownMode"
                @on-change="saveMarkdownMode"
                size="small"
      >
      </i-switch>
      Edit item mode support:
      <transition name="fade" mode="out-in">
        <span v-if="!settings.markdownMode" key="plaintext">
          Plaintext
        </span>
        <span v-if="settings.markdownMode" key="markdown">
          Markdown
        </span>
      </transition>
    </div>
    <div class="row">
      <Checkbox :value="settings.itemCreationDate"
                @on-change="saveItemCreationDate">
        Show creation date for each item
      </Checkbox>
    </div>
    <div class="row">
      <Checkbox :value="settings.stickBoardsOnTop"
                @on-change="saveStickBoardsOnTop">
        Stick boards list to the top of screen
      </Checkbox>
    </div>
  </div>
</template>

<script>
  import settingsRepository from '@/repositories/settingsRepository'

  export default {
    name: 'GeneralSettings',
    props: ['settings'],
    methods: {
      savePrependNewItems (newValue) {
        settingsRepository.updateAppSettings({prependNewItems: newValue})
        this.showSuccessNotification()
      },
      saveItemCreationDate (newValue) {
        settingsRepository.updateAppSettings({itemCreationDate: newValue})
        this.showSuccessNotification()
      },
      saveStickBoardsOnTop (newValue) {
        settingsRepository.updateAppSettings({stickBoardsOnTop: newValue})
        this.showSuccessNotification()
      },
      saveMarkdownMode (newValue) {
        settingsRepository.updateAppSettings({markdownMode: newValue})
        this.showSuccessNotification()
      },
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