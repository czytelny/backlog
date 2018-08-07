<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item">
    <div class="draggable" v-if="!isFiltered">
      <Icon type="more"
            class="movable-icon"
      ></Icon>
    </div>
    <input v-if="isEditing"
           type="text"
           v-model="draftText"
           ref="editableItem"
           @keyup.enter="saveItem"
           v-on:blur="saveItem"
           class="draftText animated fadeIn">
    <div class="item-div" v-else>
      <Checkbox :value="isDone"
                @on-change="changeIsDone">
      </Checkbox>
      <span class="item-text"
            v-html="textWithLink"
            @click="handleLinkClick"
            v-if="markdownMode"
      >
      </span>
      <span class="item-text"
            @click="handleLinkClick"
            v-if="!markdownMode"
      >
        {{textWithLink}}
      </span>
      <span v-if="showDate" class="creationDate">{{created | simpleDate}}</span>
    </div>
    <span class="actionBtns" v-if="!isEditing">
      <Button icon="edit"
              v-if="!isDone"
              shape="circle"
              size="small"
              type="dashed"
              @click="editItem"
              tabindex="-1"
      />

      <ActionButtons @remove="removeItem"
                     @moveToTop="moveItemToTop"
                     @moveToBottom="moveItemToBottom"
                     @showMoveToBoardModal="showMoveToBoardModal"
                     :boardId="boardId"
      >
      </ActionButtons>
    </span>
  </div>
</template>

<script>
  import ActionButtons from './ActionButtons'
  import MarkdownIt from 'markdown-it'

  const md = new MarkdownIt()

  export default {
    name: 'board-item',
    components: {ActionButtons},
    props: ['boardId', 'itemId', 'isDone', 'text', 'created'],
    data () {
      return {
        isEditing: false,
        draftText: this.text
      }
    },
    methods: {
      saveItem () {
        if (this.draftText.trim() === '') {
          this.draftText = ''
          return
        }
        this.turnOffEditing()
        this.$store.dispatch('changeItemVal', {
          boardId: this.boardId,
          itemId: this.itemId,
          newVal: this.draftText
        })
        this.$emit('itemChanged')
      },
      editItem () {
        this.turnOnEditing()
        this.$nextTick(function () {
          this.$refs.editableItem.focus()
        })
      },
      turnOnEditing () {
        this.isEditing = true
      },
      turnOffEditing () {
        this.isEditing = false
      },
      changeIsDone (newVal) {
        this.$store.dispatch('changeIsDone', {
          boardId: this.boardId,
          itemId: this.itemId,
          newVal
        })
        this.$emit('itemChanged')
      },
      removeItem () {
        this.$store.dispatch('removeItem', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$emit('itemChanged')
        this.$Message.success('Item removed')
      },
      moveItemToTop () {
        this.$store.dispatch('moveItemToTop', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$emit('itemChanged')
      },
      moveItemToBottom () {
        this.$store.dispatch('moveItemToBottom', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$emit('itemChanged')
      },
      showMoveToBoardModal () {
        this.$store.dispatch('showMoveToBoard', {
          itemId: this.itemId,
          itemText: this.text
        })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      handleLinkClick (event) {
        if (event.target.className === 'link') {
          event.preventDefault()
          this.open(event.target.title)
        }
      }
    },
    computed: {
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0
      },
      showDate () {
        return this.$store.state.settings.itemCreationDate
      },
      markdownMode () {
        return this.$store.state.settings.markdownMode
      },
      textWithLink () {
        if (this.markdownMode) {
          return md.render(this.text).autoLink({
            callback: function (url) {
              return `<span class='link' title="${url}">${url.split('/')[2]}</span>`
            }
          })
        }
        return this.text
      }
    },
    filters: {
      simpleDate (dateString) {
        if (!dateString) {
          return
        }
        const date = new Date(dateString)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
                ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`
      }
    }

  }
</script>

<style>

  .item-text {
    font-size: 1.2em;
  }

  .item-text p {
    display: inline;
  }

  .draggable {
    position: absolute;
    width: 25px;
    height: 100%;
    left: -19px;
    cursor: move;
    box-sizing: content-box;
    z-index: 2;
  }

  .item-div {
    max-width: 90%;
  }

  .item {
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
  }

  .creationDate {
    position: absolute;
    font-size: .7em;
    right: 0;
    bottom: 0;
    opacity: .8;
  }

  .draggable:hover .movable-icon {
    opacity: .8;
  }

  .movable-icon {
    position: absolute;
    top: 9px;
    transform: rotate(90deg);
    font-size: 2em;
    opacity: .1;
    transition: all .25s;
    color: #41B883;
  }

  .item.doneItem {
    opacity: .35;
  }

  .item:hover .actionBtns {
    opacity: 1;
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
    transition: all .7s;
    cursor: pointer;
    line-height: 16px;
    align-self: flex-start;
  }

  .isEditing {
    border-bottom: 1px dashed #41B883;
  }

  .draftText {
    border: 0;
    line-height: 14px;
    margin-top: 3px;
    margin-left: 18px;
    padding-left: 5px;
    font-size: 1.3em;
    transition: all .7s;
    width: 90%;
  }

  .draftText:focus {
    outline: none;
  }

  .link {
    color: #41B883;
    font-style: italic;
    cursor: pointer;
  }

</style>
