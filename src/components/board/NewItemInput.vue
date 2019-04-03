<template>
  <form action="#" v-on:submit.prevent="submitNewItem" class="new-item-input">
    <Transition name="fade">
      <EmojiPicker @addEmoji="addEmoji"
                   ref="emojiPicker"
                   v-if="emojiPicker"/>
    </Transition>
    <EmojiButton @toggleEmoji="toggleEmoji"/>
    <div class="input-row">
      <span class="input-form">
        <input ref="mainInput"
               :id="'newItem-'+boardId"
               v-model="newItem"
               placeholder="Add item"
               @on-enter="submitNewItem"
               @on-click="submitNewItem"
               v-shortkey="newItemFocusShortcut"
               @shortkey="focusOnInput"
               @click="trackCaret"
               @keyup="trackCaret"
               icon="plus"
               class="animated ivu-input ivu-input-large"
               :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}"
               style="width: calc(100% - 10px); margin:2px;">
         <span class="shortcut">
          {{newItemFocusShortcutString}}
        </span>
      </span>
      <span class="input-switch">
        <i-switch :value="prependNewItem"
                  @on-change="prependNewItemChange"
                  size="large"
        >
          <span slot="open">
            <Tooltip content="Add item to top">
              Head
            </Tooltip>
          </span>
          <span slot="close">
            <Tooltip content="Add item to tail">
              Tail
            </Tooltip>
          </span>
        </i-switch>
      </span>
    </div>
  </form>
</template>

<script>
  import {Switch} from 'iview';
  import keyShortcutMixin from './../../keyShortcutStringMixin';
  import EmojiPicker from './EmojiPicker';
  import EmojiButton from './item/EmojiButton';

  export default {
    name: 'NewItemInput',
    mixins: [keyShortcutMixin],
    props: [],
    components: {
      EmojiButton,
      EmojiPicker,
      'i-switch': Switch
    },
    data () {
      return {
        newItem: '',
        emojiPicker: false,
        caretPosition: 0
      };
    },
    created () {
      this.focusOnInput();
      this.$bus.$on('focusOnAddItem', this.focusOnInput);
    },
    computed: {
      boardId () {
        return this.$route.params.boardId;
      },
      newItemFocusShortcut () {
        return this.$store.state.settings.keyBindings.newItemFocus;
      },
      newItemFocusShortcutString () {
        return this.shortcutString('newItemFocus');
      },
      isSubmittingNewItem: {
        get () {
          return this.$store.state.boards.isSubmittingNewItem;
        },
        set (val) {
          this.$store.dispatch('setIsSubmittingNewItem', val);
        }
      },
      prependNewItem () {
        return this.$store.state.boards.activeBoard.prependNewItem;
      }
    },
    methods: {
      trackCaret () {
        this.caretPosition = this.$refs.mainInput.selectionStart;
      },
      addEmoji (emoji) {
        this.newItem =
          this.newItem.slice(0, this.caretPosition) + emoji + this.newItem.slice(this.caretPosition, this.newItem.length);
        this.focusOnInput(true);
      },
      toggleEmoji () {
        this.emojiPicker = !this.emojiPicker;
        if (this.emojiPicker) {
          this.$nextTick(() => {
            this.$refs.emojiPicker.focusOnSearchInput();
          });
        } else {
          this.focusOnInput();
        }
      },
      focusOnInput (extraMark) {
        const vm = this;
        this.$nextTick(() => {
          if (vm.$refs['mainInput']) {
            vm.$refs['mainInput'].focus();
            if (!extraMark) {
              vm.$refs.mainInput.selectionStart = vm.caretPosition;
              vm.$refs.mainInput.selectionEnd = vm.caretPosition;
            } else {
              vm.$refs.mainInput.selectionStart = vm.caretPosition + 1;
              vm.$refs.mainInput.selectionEnd = vm.caretPosition + 1;
            }

          }
        });
      },
      prependNewItemChange (val) {
        this.$store.dispatch('switchPrependNewItem', {
          boardId: this.boardId,
          prependNewItem: val
        }).then(() => {
          this.$emit('prependNewItemSwitched');
          this.focusOnInput();
        });
      },
      submitNewItem () {
        if (this.newItem.trim().length === 0) {
          this.newItem = '';
          return;
        }
        this.isSubmittingNewItem = true;
        const newItemPromise = this.$store.dispatch('addItem', {boardId: this.boardId, newItem: this.newItem});
        this.$Message.success('Item added');
        this.$store.dispatch('fetchBoardItems', this.boardId);
        this.newItem = '';
        this.$nextTick(() => {
          this.isSubmittingNewItem = false;
          newItemPromise.then((newItem) => {
            this.$emit('itemAdded', newItem);
          });
        });
      }
    }
  };
</script>

<style scoped>

  ::-webkit-input-placeholder {
    font-style: italic;
  }

  input {
    margin: 0 !important;
  }


  input:focus + .shortcut {
    opacity: 0;
  }


  .shortcut {
    position: absolute;
    right: 32px;
    top: 9px;
    color: #dddddd;
    transition: opacity .3s;
    user-select: none;
  }

  .new-item-input {
    margin-bottom: 16px;
  }

  .input-row {
    display: flex;
    align-items: center;
  }

  .input-form {
    flex: 1;
    position: relative;
  }

  .input-switch {
    flex: 0;
  }
</style>
