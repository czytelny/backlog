<template>
  <div>
    <h1 style="margin-top:0;">{{$t("modals.boards")}}</h1>
    <table>
      <thead>
      <tr>
        <td>{{$t("modals.shortcut")}}</td>
        <td>{{$t("modals.action")}}</td>
      </tr>
      </thead>
      <tbody>
      <KeyBinding id="addNewBoard"
                  :name="$t('modals.create_new_board_modal')"
                  :keys="addNewBoardShortcutWin"/>
      <KeyBinding :name="$t('modals.switch_to_next_board')"
                  id="nextTab"
                  :keys="nextBoardShortcutWin"/>
      <KeyBinding :name="$t('modals.switch_to_prev_board')"
                  id="prevTab"
                  :keys="prevBoardShortcutWin"/>
      </tbody>
    </table>

    <h1>
      {{$t("modals.items")}}
    </h1>
    <table>
      <thead>
      <tr>
        <td>{{$t("modals.shortcut")}}</td>
        <td>{{$t("modals.action")}}</td>
      </tr>
      </thead>
      <tbody>
      <KeyBinding :name="$t('modals.bring_focus_to_add_item')"
                  id="newItemFocus"
                  :keys="newItemFocusWin"/>
      <KeyBinding :name="$t('modals.bring_focus_to_filter_items')"
                  id="filterItemsFocus"
                  :keys="filterItemsFocusWin"/>
      <KeyBinding :name="$t('modals.find_item')"
                  id="showFindItem"
                  :keys="showFindItemWin"/>
      <KeyBinding :name="$t('modals.accept_editing_item')"
                  id="acceptItemChange"
                  :keys="acceptItemChange"/>
      </tbody>
    </table>

    <h1>{{$t('modals.misc')}}</h1>
    <table>
      <thead>
      <tr>
        <td>{{$t('modals.shortcut')}}</td>
        <td>{{$t('modals.action')}}</td>
      </tr>
      </thead>
      <tbody>

      <KeyBinding id="showKeymap"
                  :name="$t('modals.show_keymap_window')"
                  :keys="showKeymapShortcutWin"/>
      </tbody>
    </table>
  </div>
</template>

<script>
  import KeyBinding from "./KeyBinding";

  export default {
    name: "WindowsKeys",
    components: {KeyBinding},
    computed: {
      showFindItemWin() {
        return this.$store.state.settings.keyBindings.showFindItem.win;
      },
      showKeymapShortcutWin() {
        return this.$store.state.settings.keyBindings.showKeymap.win;
      },
      addNewBoardShortcutWin() {
        return this.$store.state.settings.keyBindings.addNewBoard.win;
      },
      nextBoardShortcutWin() {
        return this.$store.state.settings.keyBindings.nextTab.win;
      },
      prevBoardShortcutWin() {
        return this.$store.state.settings.keyBindings.prevTab.win;
      },
      newItemFocusWin() {
        return this.$store.state.settings.keyBindings.newItemFocus.win;
      },
      filterItemsFocusWin() {
        return this.$store.state.settings.keyBindings.filterItemsFocus.win;
      },
      acceptItemChange() {
        return this.$store.state.settings.keyBindings.acceptItemChange.win;
      },
      showEmojiWin() {
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
