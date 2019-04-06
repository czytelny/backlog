<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item"
       :data-id="itemId"
       :data-boardId="boardId"
       :draggable="isEditing">
    <div class="drag" v-if="isEditing">
      <Icon type="md-reorder"></Icon>
    </div>
    <Transition name="fade" v-if="isEditing">
      <EmojiPicker @addEmoji="addEmoji"
                   @closeEmoji="hideEmoji"
                   style="position: absolute; top:40px; right:7.2%;"
                   ref="emojiPicker"
                   v-if="emojiPicker"/>
    </Transition>
    <textarea-autosize
      v-if="isEditing"
      v-model="draftText"
      ref="inputEdit"
      autocomplete="off"
      spellcheck="false"
      placeholder="Enter something..."
      rows="1"
      autofocus="autofocus"
      class="ivu-input draftText animated"
      @keyup.esc.native="turnOffEditing"
      @keydown.meta.69.native="showEmoji"
      @keydown.ctrl.69.native="showEmoji"
      :class="{'slideInDown' : isEditing}"
    >
    </textarea-autosize>

    <Button type="primary"
            v-if="isEditing"
            class="ok-edit-btns"
            @click="saveItem(); turnOffEditing();"
    >
      OK <span class="shortcut">{{shortcutString('acceptItemChange')}}</span>
    </Button>
    <button v-if="isEditing"
            style="display:none;"
            v-shortkey="acceptEditShortcut"
            @shortkey="saveItem(); turnOffEditing();"/>
    <Button
      v-if="isEditing"
      class="ok-edit-btns"
      style="margin-left:4px;"
      @click="turnOffEditing"
    >
      Cancel <span class="shortcut">{{shortcutString('cancelItemChange')}}</span>
    </Button>
    <EmojiButton class="emoji-btn" v-if="isEditing"
                 @toggleEmoji="toggleEmoji"/>


    <div class="item-div"
         v-else>
      <Checkbox :value="isDone"
                @on-change="changeIsDone">
      </Checkbox>
      <span class="item-text"
            v-html="textWithLink"
            @click="handleLinkClick"
            @dblclick="editItem"
      >
      </span>
      <Icon type="ios-search-outline"
            class="edit-icon"
            @click="editItem"
            v-if="!isEditing"
            size="16"/>

      <ActionButtons @remove="removeItem"
                     @moveToTop="moveItemToTop"
                     @moveToBottom="moveItemToBottom"
                     :boardId="boardId"
      >
      </ActionButtons>

      <BoardItemCalendar :created="created" v-if="showDate"/>
    </div>
  </div>
</template>

<script>
  import ActionButtons from './ActionButtons';
  import MarkdownIt from 'markdown-it';
  import BoardItemCalendar from './BoardItemCalendar';
  import keyShortcutMixin from './../../../keyShortcutStringMixin';
  import EmojiPicker from './../EmojiPicker';
  import EmojiButton from './EmojiButton';

  const md = new MarkdownIt({
    breaks: true
  });

  export default {
    name: 'board-item',
    components: {BoardItemCalendar, ActionButtons, EmojiButton, EmojiPicker},
    mixins: [keyShortcutMixin],
    props: ['boardId', 'itemId', 'isDone', 'text', 'created'],
    data () {
      return {
        isEditing: false,
        draftText: this.text,
        showDropdown: false,
        emojiPicker: false
      };
    },
    created () {
      this.$bus.$on('finishItemEditing', this.turnOffEditing);
    },
    methods: {
      showEmoji () {
        this.emojiPicker = true;
        this.$nextTick(() => {
          this.$refs.emojiPicker.focusOnSearchInput();
        });
      },
      hideEmoji () {
        this.emojiPicker = false;
        this.$refs.inputEdit.$el.focus();
      },
      toggleEmoji () {
        this.emojiPicker = !this.emojiPicker;
        if (this.emojiPicker) {
          this.$nextTick(() => {
            this.$refs.emojiPicker.focusOnSearchInput();
          });
        } else {
          this.$refs.inputEdit.$el.focus();
        }
      },
      addEmoji ({emoji}) {
        const emojiLength = emoji.length;
        const beforeText = this.newItem.slice(0, this.caretPosition);
        const afterText = this.newItem.slice(this.caretPosition, this.newItem.length);
        this.newItem = beforeText + emoji + afterText;
        this.caretPosition += emojiLength;
      },
      saveItem () {
        if (this.draftText.trim() === '') {
          this.draftText = '';
          return;
        }
        this.$store.dispatch('changeItemVal', {
          boardId: this.boardId,
          itemId: this.itemId,
          newVal: this.draftText
        });
        this.$store.dispatch('fetchBoardItems', this.boardId);
      },
      editItem () {
        this.draftText = this.text;
        this.isEditing = true;
        this.$nextTick().then(() => this.$refs.inputEdit.$el.focus());
      },
      turnOffEditing () {
        this.isEditing = false;
        this.$bus.$emit('focusOnAddItem');
        this.emojiPicker = false;
      },
      changeIsDone (newVal) {
        this.$store.dispatch('changeIsDone', {
          boardId: this.boardId,
          itemId: this.itemId,
          newVal
        });
        this.$store.dispatch('fetchBoardItems', this.boardId);
        this.$store.dispatch('fetchBoards');
        this.$bus.$emit('focusOnAddItem');
      },
      removeItem () {
        this.$store.dispatch('removeItem', {
          boardId: this.boardId,
          itemId: this.itemId
        });
        this.$store.dispatch('fetchBoardItems', this.boardId);
        this.$bus.$emit('focusOnAddItem');
        this.$Message.success('Item removed');
      },
      moveItemToTop () {
        this.$store.dispatch('moveItemToTop', {
          boardId: this.boardId,
          itemId: this.itemId
        });
        this.$store.dispatch('fetchBoardItems', this.boardId);
        this.$bus.$emit('focusOnAddItem');
      },
      moveItemToBottom () {
        this.$store.dispatch('moveItemToBottom', {
          boardId: this.boardId,
          itemId: this.itemId
        });
        this.$store.dispatch('fetchBoardItems', this.boardId);
        this.$bus.$emit('focusOnAddItem');
      },
      open (link) {
        this.$electron.shell.openExternal(link);
      },
      handleLinkClick (event) {
        event.preventDefault();
        if (event.target.className === 'link') {
          this.open(event.target.title);
        }

        if (event.target.tagName.toLowerCase() === 'a') {
          this.open(event.target.href);
        }
      }
    },
    computed: {
      acceptEditShortcut () {
        return this.$store.state.settings.keyBindings.acceptItemChange;
      },
      cancelEditShortcut () {
        return this.$store.state.settings.keyBindings.cancelItemChange;
      },
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0;
      },
      showDate () {
        return this.$store.state.settings.itemCreationDate;
      },
      textWithLink () {
        return md.render(this.text).autoLink({
          callback: function (url) {
            return `<span class='link' title="${url}">${url.split('/')[2]}</span>`;
          }
        });
      }
    }
  };
</script>

<style scoped>

  .emoji-btn {
    position: absolute;
    top: 0;
    right: 7.5%;
    z-index: 100;
  }

  .emoji-btn >>> i {
    margin-top: 1px;
  }

  .shortcut {
    color: #dddddd;
    user-select: none;
    margin-left: 8px;
    font-size: .8em;
    line-height: 1em;
  }

  .item {
    transition: all .3s;
  }

  .item.newlyAddedItem {
    box-shadow: inset 0 0 70px rgba(98, 104, 112, 0.26);
    border: 1px solid rgba(98, 104, 112, 0.66);
  }

  .item-text {
    font-size: 1.2em;
    margin-top: 9px;
  }

  .item-text p {
    display: inline;
  }

  .drag {
    position: absolute;
    width: 25px;
    height: 100%;
    left: 2px;
    cursor: move;
    font-size: 1.5em;

  }

  .item-div {
    max-width: 90%;
    display: flex;
  }

  .item {
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    min-height: 40px;
    padding-bottom: 5px;
    -webkit-border-radius: 3px;
  }

  .item:hover {
    background-color: #eeeeef;
  }


  .ok-edit-btns {
    margin-left: 25px;
    margin-top: 8px;
    animation-duration: .3s;
  }

  .edit-icon {
    opacity: 0;
    cursor: pointer;
    transition: opacity .3s;
    margin-top: 12px;
  }

  .item-div:hover .edit-icon {
    opacity: 1;
  }

  .movable-icon {
    position: absolute;
    top: 10px;
    font-size: 2em;
    transition: all .25s;
    /*left: !*opacity: 0;*!*/
  }

  .item.doneItem {
    opacity: .35;
  }

  .item:hover .actionBtns {
    opacity: 1;
  }

  .item:hover .movable-icon {
    opacity: 1
  }

  .actionBtns {
    opacity: 0;
    cursor: pointer;
    flex-shrink: 0;
    align-self: center;
    transition: all .3s;
  }

  .actionBtns:hover {
    opacity: 1;
  }

  .item label {
    margin-top: 12px;
    padding-left: 5px;
    font-size: 1.3em;
    cursor: pointer;
    line-height: 16px;
    align-self: flex-start;
  }

  .isEditing {
    border-bottom: 1px dashed #3b3b3b;
    border-top: 1px dashed #3b3b3b;
  }

  textarea.draftText {
    margin-top: 8px;
    margin-left: 25px;
    transition: all .3s;
    width: 90%;
    animation-duration: .3s;
  }

  .item a {
    color: #41B883 !important;
    font-style: italic;
    cursor: pointer;
  }

  .item a:hover {
    color: #338a62 !important;
  }

  .item .link {
    color: #41B883;
    font-style: italic;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .item .link:hover {
    color: #338a62;
  }

</style>
