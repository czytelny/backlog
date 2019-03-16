<template>
  <Modal id="keymap-modal"
         :value="isVisible"
         title="Key Bindings"
         @on-visible-change="visibleChange"
  >
    <div class="keymap">
      <table v-if="isWindows || isLinux">
        <thead>
        <tr>
          <td>Shortcut</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        <KeyBinding id="showKeymap"
                    name="Show keymap window"
                    :keys="showKeymapShortcutWin"/>
        <KeyBinding id="addNewBoard"
                    name="Create New Board Modal"
                    :keys="addNewBoardShortcutWin"/>
        <KeyBinding name="Switch to the next board"
                    id="nextTab"
                    :keys="nextBoardShortcutWin"/>
        <KeyBinding name="Switch to the previous board"
                    id="prevTab"
                    :keys="prevBoardShortcutWin"/>
        <KeyBinding name="Bring focus to 'Add New Item' field"
                    id="newItemFocus"
                    :keys="newItemFocusWin"/>
        </tbody>
      </table>
      <table v-if="isMac">
        <thead>
        <tr>
          <td>Shortcut</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        <KeyBinding id="showKeymap"
                    name="Show keymap window"
                    :keys="showKeymapShortcutMac"/>
        <KeyBinding id="addNewBoard"
                    name="Create New Board Modal"
                    :keys="addNewBoardShortcutMac"/>
        <KeyBinding name="Switch to the next board"
                    id="nextTab"
                    :keys="nextBoardShortcutMac"/>
        <KeyBinding name="Switch to the previous board"
                    id="prevTab"
                    :keys="prevBoardShortcutMac"/>
        <KeyBinding name="Bring focus to 'Add New Item' field"
                    id="newItemFocus"
                    :keys="newItemFocusMac"/>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">OK</Button>
    </div>
  </Modal>
</template>

<script>
  import KeyBinding from './keyBindings/KeyBinding'

  export default {
    name: 'KeyMapModal',
    components: {KeyBinding},
    computed: {
      isVisible () {
        return this.$store.state.modals.keymap.isVisible
      },
      system () {
        return this.$store.state.modals.keymap.system
      },
      isWindows () {
        return this.system.includes('win')
      },
      isMac () {
        return this.system.includes('mac')
      },
      isLinux () {
        return this.system.includes('linux')
      },
      showKeymapShortcutMac () {
        return this.$store.state.settings.keyBindings.showKeymap.mac
      },
      addNewBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.addNewBoard.mac
      },
      nextBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.nextTab.mac
      },
      prevBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.prevTab.mac
      },
      newItemFocusMac () {
        return this.$store.state.settings.keyBindings.newItemFocus.mac
      },
      showKeymapShortcutWin () {
        return this.$store.state.settings.keyBindings.showKeymap.win
      },
      addNewBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.addNewBoard.win
      },
      nextBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.nextTab.win
      },
      prevBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.prevTab.win
      },
      newItemFocusWin () {
        return this.$store.state.settings.keyBindings.newItemFocus.win
      }
    },
    created () {
      this.$store.dispatch('setSystem', window.navigator.platform.toLowerCase())
    },
    methods: {
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      closeModal () {
        this.$store.dispatch('hideKeymapModal')
      }
    }
  }
</script>

<style>

  .close-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 4px;
  }

  thead td {
    padding: 4px 0;
  }

  .header {
    margin-bottom: 16px;
  }

  tbody tr {
    border-bottom: 1px solid #f3f3f3;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px;
    transition: all .3s;
  }

  tbody tr:hover {
    background-color: #f3f3f3;
  }

  .keymap {
    position: relative;
    width: 500px;
    height: 400px;
    border-radius: 4px;
    padding: 16px;
  }
</style>
