<template>
  <div class="find-item-container">
    <Icon class="filter-btn"
          type="ios-search"/>
    <input v-model="findItem"
           :id="'findItem-' + activeBoardId"
           class="findItem"
           :class="{'disabled': isDisabled}"
           :placeholder="$t('boardSettingsBar.filter')"
           :ref="activeBoardId"
           v-shortkey="filterItemsShortcut"
           @shortkey="inputFocus()"
           :disabled="isDisabled"
    >
    <span class="shortcut">
      <code>{{filterItemsShortcutString}}</code>
    </span>
    <Icon class="clear-btn"
          :class="{'btn-visible': findItem.length}"
          type="ios-close-circle-outline" @click="clearFilterInput"/>
  </div>
</template>

<script>
  import keyShortcutMixin from "./../../../keyShortcutStringMixin";

  export default {
    name: "FindItem",
    mixins: [keyShortcutMixin],
    props: ["isDisabled"],
    computed: {
      filterItemsShortcut() {
        return this.$store.state.settings.keyBindings.filterItemsFocus;
      },
      filterItemsShortcutString() {
        return this.shortcutString("filterItemsFocus");
      },
      findItem: {
        get() {
          return this.$store.state.boards.findItem.itemText;
        },
        set(val) {
          this.$store.dispatch("changeFindItem", val);
        }
      },
      activeBoardId() {
        return this.$store.state.boards.activeBoard.id;
      }
    },
    methods: {
      inputFocus() {
        document.getElementById(`findItem-${this.activeBoardId}`).focus();
      },
      clearFilterInput() {
        this.findItem = "";
        this.inputFocus();
      }
    }
  };
</script>

<style scoped>
  ::-webkit-input-placeholder {
    font-style: italic;
    color: #cecece;
  }

  .find-item-container {
    width: 60%;
    position: relative;
  }

  .find-item-container input:focus + .shortcut {
    opacity: 0;
  }

  .shortcut {
    position: absolute;
    right: 42px;
    top: 5px;
    color: #dddddd;
    transition: opacity .3s;
    user-select: none;
  }

  .filter-btn {
    position: absolute;
    top:8px;
    left:8px;
  }

  .clear-btn {
    opacity: 0;
    margin-left: -22px;
    transition: all .3s;
  }

  .btn-visible {
    opacity: 1;
    cursor: pointer;
  }

  input.findItem {
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid #eeeeef;
    -webkit-transition: all .3s;
    border-radius: 4px;
    padding: 4px 24px;
    width: 95%;
  }

  input.findItem.disabled {
    background-color: #f8f8f8;
    cursor: no-drop;
  }

  input.findItem:focus {
    outline: none;
    border-color: rgba(98, 104, 112, 0.43);
  }
</style>
