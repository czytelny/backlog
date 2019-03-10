<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item">
    <div class="drag" v-if="isEditing">
      <Icon type="md-reorder"></Icon>
    </div>

    <textarea-autosize
      v-if="isEditing"
      v-model="draftText"
      ref="inputEdit"
      autocomplete="off"
      spellcheck="false"
      placeholder="Enter something..."
      rows="1"
      @keyup.esc.native="saveItem"
      @blur.native="saveItem"
      autofocus="autofocus"
      class="ivu-input draftText animated"
      :class="{'slideInDown' : isEditing}"
    >
    </textarea-autosize>

    <Button type="primary"
            v-if="isEditing"
            class="ok-edit-btns"
            @click="turnOffEditing"
    >
      OK
    </Button>


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
      <Icon type="ios-create"
            class="edit-icon"
            @click="editItem"
            v-if="!isEditing"
            size="16"/>

      <ActionButtons @remove="removeItem"
                     @moveToTop="moveItemToTop"
                     @moveToBottom="moveItemToBottom"
                     @showMoveToBoardModal="showMoveToBoardModal"
                     :boardId="boardId"
      >
      </ActionButtons>
      <span v-if="showDate" class="creationDate">
         <Tooltip placement="left" :content="daysFrom(created)">
           {{created | simpleDate}}
         </Tooltip>
      </span>
    </div>
  </div>
</template>

<script>
  import ActionButtons from './ActionButtons'
  import MarkdownIt from 'markdown-it'

  const md = new MarkdownIt({
    breaks: true
  })

  export default {
    name: 'board-item',
    components: {ActionButtons},
    props: ['boardId', 'itemId', 'isDone', 'text', 'created'],
    data () {
      return {
        isEditing: false,
        draftText: this.text,
        showDropdown: false
      }
    },
    methods: {
      daysFrom (firstDate) {
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const today = new Date()
        return `Created ${Math.round(Math.abs((firstDate.getTime() - today.getTime()) / (oneDay)))} days ago`
      },
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
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.$bus.$emit('focusOnAddItem')
      },
      editItem () {
        this.isEditing = true
        this.$nextTick().then(() => this.$refs.inputEdit.$el.focus())
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
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.$store.dispatch('fetchBoards')
        this.$bus.$emit('focusOnAddItem')
      },
      removeItem () {
        this.$store.dispatch('removeItem', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.$bus.$emit('focusOnAddItem')
        this.$Message.success('Item removed')
      },
      moveItemToTop () {
        this.$store.dispatch('moveItemToTop', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.$bus.$emit('focusOnAddItem')
      },
      moveItemToBottom () {
        this.$store.dispatch('moveItemToBottom', {
          boardId: this.boardId,
          itemId: this.itemId
        })
        this.$store.dispatch('fetchBoardItems', this.boardId)
        this.$bus.$emit('focusOnAddItem')
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
        event.preventDefault()
        if (event.target.className === 'link') {
          this.open(event.target.title)
        }

        if (event.target.tagName.toLowerCase() === 'a') {
          this.open(event.target.href)
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
        return md.render(this.text).autoLink({
          callback: function (url) {
            return `<span class='link' title="${url}">${url.split('/')[2]}</span>`
          }
        })
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

  .item {
    transition: all .3s;
  }

  .item.newlyAddedItem {
    box-shadow: inset 0 0 3px #2d8cf0;;
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
    margin-left: 23px;
    margin-top: 8px;
    animation-duration: .3s;
  }

  .edit-icon {
    opacity: 0;
    cursor: pointer;
    transition: opacity .3s;
    margin-top: 11px;
  }

  .item-div:hover .edit-icon {
    opacity: 1;
  }

  .creationDate {
    position: absolute;
    font-size: .7em;
    color: #979797;
    right: 32px;
    bottom: 0;
    opacity: .8;
    cursor: default;
  }


  .movable-icon {
    position: absolute;
    top: 10px;
    font-size: 2em;
    transition: all .25s;
    left: /*opacity: 0;*/
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
