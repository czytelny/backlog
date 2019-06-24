<template>
  <div>
    <h1 style="margin-top:-16px;">{{$t("modals.boards")}}</h1>
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
                  :keys="addNewBoardShortcutMac"/>
      <KeyBinding :name="$t('modals.switch_to_next_board')"
                  id="nextTab"
                  :keys="nextBoardShortcutMac"/>
      <KeyBinding :name="$t('modals.switch_to_prev_board')"
                  id="prevTab"
                  :keys="prevBoardShortcutMac"/>
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
                  :keys="newItemFocusMac"/>
      <KeyBinding :name="$t('modals.bring_focus_to_filter_items')"
                  id="filterItemsFocus"
                  :keys="filterItemsFocusMac"/>
      <KeyBinding :name="$t('modals.find_item')"
                  id="showFindItem"
                  :keys="showFindItemMac"/>
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
        return this.$store.state.settings.keyBindings.acceptItemChange.mac;
      },
      cancelItemChange () {
        return this.$store.state.settings.keyBindings.cancelItemChange.mac;
      },
      showEmojiMac () {
        return this.$store.state.settings.keyBindings.showEmoji.win;
      }
    }
  };
</script>

<style scoped>
 table{
   margin-bottom: 8px;
 }
</style>
