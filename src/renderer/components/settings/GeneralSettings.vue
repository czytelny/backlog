<template>
  <div>
    <h3>General settings</h3>
    <div class="row">
      <i-switch v-model="settings.prependNewItems"
                size="small"
                @on-change="savePrependNewItems()"
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
      <Checkbox v-model="settings.itemCreationDate" @on-change="saveItemCreationDate">
        Show creation date for each item
      </Checkbox>
    </div>
    <div class="row">
      <Checkbox v-model="settings.stickBoardsOnTop" @on-change="saveStickBoardsOnTop">
        Stick boards list to the top of screen
      </Checkbox>
    </div>
    <div class="row">
      <i-switch v-model="settings.markdownMode"
                size="small"
                @on-change="saveMarkdownMode()"
      >
      </i-switch>
      Edit item mode support:
      <transition name="fade" mode="out-in">
        <span v-if="!settings.markdownMode" key="html">
          HTML
        </span>
        <span v-if="settings.markdownMode" key="markdown">
          Markdown
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
  import settingsRepository from '@/repositories/settingsRepository'

  export default {
    name: 'GeneralSettings',
    props: ['settings'],
    methods: {
      savePrependNewItems () {
        settingsRepository.updateAppSettings({prependNewItems: this.settings.prependNewItems})
        this.showSuccessNotification()
      },
      saveItemCreationDate () {
        settingsRepository.updateAppSettings({itemCreationDate: this.settings.itemCreationDate})
        this.showSuccessNotification()
      },
      saveStickBoardsOnTop () {
        settingsRepository.updateAppSettings({stickBoardsOnTop: this.settings.stickBoardsOnTop})
        this.showSuccessNotification()
      },
      saveMarkdownMode () {
        settingsRepository.updateAppSettings({markdownMode: this.settings.markdownMode})
        this.showSuccessNotification()
      },
      showSuccessNotification () {
        this.$Message.success('Setting updated')
      }
    }
  }
</script>

<style scoped>

</style>