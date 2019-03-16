<template>
  <div style="display:none;">
    <button v-shortkey="nextTabShortcuts"
            @shortkey="activateNextTab"/>
    <button
      v-shortkey="prevTabShortcuts"
      @shortkey="activatePreviousTab"/>

    <button v-shortkey="showKeymapShortcut"
            @shortkey="showKeymap"/>

    <button v-shortkey="newBoardModalShortcut"
            @shortkey="showNewBoardModal"/>
  </div>
</template>

<script>
  export default {
    name: 'GlobalKeyBindings',
    computed: {
      newBoardModalShortcut () {
        return this.$store.state.settings.keyBindings.addNewBoard
      },
      showKeymapShortcut () {
        return this.$store.state.settings.keyBindings.showKeymap
      },
      nextTabShortcuts () {
        return this.$store.state.settings.keyBindings.nextTab
      },
      prevTabShortcuts () {
        return this.$store.state.settings.keyBindings.prevTab
      }
    },
    methods: {
      activateNextTab () {
        const activeTabDOM = document.querySelector('a.router-link-active')
        const nextTab = activeTabDOM.parentElement.nextSibling
        if (nextTab) {
          const routePath = nextTab.children[1].hash.substring(1, nextTab.children[1].hash.length)
          const boardId = routePath.split('/')[2]
          this.$router.push(routePath)
          this.$store.dispatch('setActiveBoard', boardId)
        }
      },
      activatePreviousTab () {
        const activeTabDOM = document.querySelector('a.router-link-active')
        const prevTab = activeTabDOM.parentElement.previousSibling
        if (prevTab) {
          const routePath = prevTab.children[1].hash.substring(1, prevTab.children[1].hash.length)
          const boardId = routePath.split('/')[2]
          this.$router.push(routePath)
          this.$store.dispatch('setActiveBoard', boardId)
        }
      },
      showKeymap () {
        this.$store.dispatch('showKeymapModal')
      },
      showNewBoardModal () {
        this.$store.dispatch('showNewBoardModal')
      }
    }

  }
</script>

<style scoped>

</style>
