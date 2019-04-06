<template>
  <div>
    <h1 style="margin-top:0;">Boards</h1>
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
                  :keys="addNewBoardShortcutWin"/>
      <KeyBinding name="Switch to the next board"
                  id="nextTab"
                  :keys="nextBoardShortcutWin"/>
      <KeyBinding name="Switch to the previous board"
                  id="prevTab"
                  :keys="prevBoardShortcutWin"/>
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
                  :keys="newItemFocusWin"/>
      <KeyBinding name="Bring focus to 'Filter items' field"
                  id="filterItemsFocus"
                  :keys="filterItemsFocusWin"/>
      <KeyBinding name="Find item"
                  id="showFindItem"
                  :keys="showFindItemWin"/>
      <KeyBinding name="Accept Editing Item"
                  id="acceptItemChange"
                  :keys="acceptItemChange"/>
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
                  :keys="showKeymapShortcutWin"/>
      </tbody>
    </table>
  </div>
</template>

<script>
  import KeyBinding from './KeyBinding';

  export default {
    name: 'WindowsKeys',
    components: {KeyBinding},
    computed: {
      showFindItemWin () {
        return this.$store.state.settings.keyBindings.showFindItem.win;
      },
      showKeymapShortcutWin () {
        return this.$store.state.settings.keyBindings.showKeymap.win;
      },
      addNewBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.addNewBoard.win;
      },
      nextBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.nextTab.win;
      },
      prevBoardShortcutWin () {
        return this.$store.state.settings.keyBindings.prevTab.win;
      },
      newItemFocusWin () {
        return this.$store.state.settings.keyBindings.newItemFocus.win;
      },
      filterItemsFocusWin () {
        return this.$store.state.settings.keyBindings.filterItemsFocus.win;
      },
      acceptItemChange () {
        return this.$store.state.settings.keyBindings.acceptItemChange.win;
      },
      showEmojiWin () {
        return this.$store.state.settings.keyBindings.showEmoji.win;
      }
    }
  };
</script>

<style scoped>
  h1 {
    color: #717171;
    margin-top: 16px;
  }
</style>
