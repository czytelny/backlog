<template>
  <div style="display:none;">
    <button v-shortkey="nextTabShortcuts"
            @shortkey="activateNextTab"/>
    <button
      v-shortkey="prevTabShortcuts"
      @shortkey="activatePreviousTab"/>

    <button v-shortkey="keymapShortcut"
            @shortkey="showKeymap"/>

    <button v-shortkey="newBoardModalKeymap"
            @shortkey="showNewBoardModal"/>
  </div>
</template>

<script>
  export default {
    name: 'GlobalKeyBindings',
    data () {
      return {
        nextTabShortcuts: {win: ['ctrl', 'shift', '}'], win2: ['alt', 'shift', '}'], mac: ['meta', 'shift', ']']},
        prevTabShortcuts: {win: ['ctrl', 'shift', '{'], win2: ['alt', 'shift', '{'], mac: ['meta', 'shift', '[']},
        keymapShortcut: {win: ['ctrl', 'k'], win2: ['alt', 'k'], mac: ['meta', 'k']}
      }
    },
    computed: {
      newBoardModalKeymap () {
        return this.$store.state.settings.keyBindings.addNewBoard
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
