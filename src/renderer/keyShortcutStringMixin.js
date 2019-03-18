export default {
  methods: {
    charsReplacer (str) {
      return this.$options.filters.shiftTextReplacer(this.$options.filters.metaTextReplacer(str))
    },
    shortcutString (shortcutId) {
      if (!this.$store.state.settings.keyBindings[shortcutId]) {
        return ''
      }
      if (this.$store.state.modals.keymap.system.includes('mac')) {
        return this.charsReplacer(this.$store.state.settings.keyBindings[shortcutId].mac
          .join('')
          .toUpperCase())
      } else {
        return `${this.$store.state.settings.keyBindings[shortcutId].win.join('+').toUpperCase()}`
      }
    }
  }
}
