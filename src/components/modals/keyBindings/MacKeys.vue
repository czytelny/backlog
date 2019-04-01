<template>
  <div>
    <h1 style="margin-top:-16px;">Boards</h1>
    <table>
      <thead>
      <tr>
        <td>Shortcut</td>
        <td>Action</td>
      </tr>
      </thead>
      <tbody>
      <KeyBinding id="addNewBoard"
                  name="Create New Board Modal"
                  :keys="addNewBoardShortcutMac"/>
      <KeyBinding name="Switch to the next board"
                  id="nextTab"
                  :keys="nextBoardShortcutMac"/>
      <KeyBinding name="Switch to the previous board"
                  id="prevTab"
                  :keys="prevBoardShortcutMac"/>
      </tbody>
    </table>

    <h1>Items</h1>
    <table>
      <thead>
      <tr>
        <td>Shortcut</td>
        <td>Action</td>
      </tr>
      </thead>
      <tbody>
      <KeyBinding name="Bring focus to 'Add New Item' field"
                  id="newItemFocus"
                  :keys="newItemFocusMac"/>
      <KeyBinding name="Bring focus to 'Filter items' field"
                  id="filterItemsFocus"
                  :keys="filterItemsFocusMac"/>
      <KeyBinding name="Find item"
                  id="showFindItem"
                  :keys="showFindItemMac"/>
      <KeyBinding name="Accept Editing Item"
                  id="acceptItemChange"
                  :keys="acceptItemChange"/>
      <KeyBinding name="Cancel Editing Item"
                  id="cancelItemChange"
                  :keys="cancelItemChange"/>
      </tbody>
    </table>

    <h1>Misc</h1>
    <table>
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
      </tbody>
    </table>
  </div>
</template>

<script>
  import KeyBinding from './KeyBinding';

  export default {
    name: 'MacKeys',
    components: {KeyBinding},
    computed: {
      showKeymapShortcutMac () {
        return this.$store.state.settings.keyBindings.showKeymap.mac;
      },
      addNewBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.addNewBoard.mac;
      },
      nextBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.nextTab.mac;
      },
      prevBoardShortcutMac () {
        return this.$store.state.settings.keyBindings.prevTab.mac;
      },
      newItemFocusMac () {
        return this.$store.state.settings.keyBindings.newItemFocus.mac;
      },
      filterItemsFocusMac () {
        return this.$store.state.settings.keyBindings.filterItemsFocus.mac;
      },
      showFindItemMac () {
        return this.$store.state.settings.keyBindings.showFindItem.mac;
      },
      acceptItemChange () {
        return this.$store.state.settings.keyBindings.acceptItemChange.win;
      },
      cancelItemChange () {
        return this.$store.state.settings.keyBindings.cancelItemChange.win;
      }
    }
  };
</script>

<style scoped>
 table{
   margin-bottom: 8px;
 }
</style>
