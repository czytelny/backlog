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
        <KeyBinding name="Bring focus to 'Filter items' field"
                    id="filterItemsFocus"
                    :keys="filterItemsFocusWin"/>
        <KeyBinding name="Find item"
                    id="showFindItem"
                    :keys="showFindItemWin"/>
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
        <KeyBinding name="Bring focus to 'Filter items' field"
                    id="filterItemsFocus"
                    :keys="filterItemsFocusMac"/>
        <KeyBinding name="Find item"
                    id="showFindItem"
                    :keys="showFindItemMac"/>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <Button type="text" @click="resetToDefaults">Reset to defaults</Button>
      <Button size="large" @click="closeModal">Close</Button>
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
      filterItemsFocusMac () {
        return this.$store.state.settings.keyBindings.filterItemsFocus.mac
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
      },
      filterItemsFocusWin () {
        return this.$store.state.settings.keyBindings.filterItemsFocus.win
      },
      showFindItemWin () {
        return this.$store.state.settings.keyBindings.showFindItem.win
      },
      showFindItemMac () {
        return this.$store.state.settings.keyBindings.showFindItem.mac
      }
    },
    methods: {
      resetToDefaults () {
        this.$Modal.confirm({
          title: `Reset key bindings to defaults`,
          okText: 'Reset',
          cancelText: 'Cancel',
          closable: true,
          content: `<p>You are going to reset key bindings to default values.</p>
                    <p>Are you sure you want to continue?</p>`,
          onOk: () => {
            this.$store.dispatch('resetKeyBindings')
            this.$store.dispatch('fetchSettings')
            this.$Message.success('Key bindings cleared out')
          }
        })
      },
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
    border-radius: 4px;
    padding: 16px;
  }
</style>
