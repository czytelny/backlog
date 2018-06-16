<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item">
    <div class="draggable">
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
    <div v-else @click.right="showItemMenu">
      <Checkbox :value="isDone"
                @on-change="changeIsDone">
      </Checkbox>
      <span class="item-text"
            v-html="textWithLink"
            @click="handleLinkClick"
      > </span>
      <span v-if="showDate" class="creationDate">{{created | simpleDate}}</span>
    </div>
    <span class="actionBtns" v-if="!isEditing">
      <Button icon="edit"
              v-if="!isDone"
              shape="circle"
              size="small"
              type="dashed"
              @click="editItem"
      />
      <Button icon="ios-trash-outline"
              shape="circle"
              size="small"
              type="dashed"
              @click="removeItem"/>
    </span>
    <transition name="fade" mode="out-in">
      <ul class="item-menu"
          tabindex="-1"
          v-if="viewItemMenu"
          @mouseleave="closeItemMenu" >
        <li>
          <Icon type="arrow-return-right"></Icon>
          Move to the board...</li>
        <li>
          <Icon type="arrow-up-a"></Icon>
          Move to the top</li>
        <li><Icon type="arrow-down-a"></Icon>
          Move to the bottom</li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'board-item',
    props: ['itemId', 'isDone', 'text', 'created', 'showDate'],
    data () {
      return {
        isEditing: false,
        draftText: this.text,
        viewItemMenu: false
      }
    },
    methods: {
      showItemMenu () {
        this.viewItemMenu = true
      },
      closeItemMenu () {
        this.viewItemMenu = false
      },
      saveItem () {
        if (this.draftText.trim() === '') {
          this.draftText = ''
          return
        }
        this.turnOffEditing()
        this.$emit('changeItemVal', this.itemId, this.draftText)
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
        this.$emit('changeIsDone', this.itemId, newVal)
      },
      removeItem () {
        this.$emit('removeItem', this.itemId)
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
      textWithLink () {
        return this.text.autoLink({
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

  .item-text {
    font-size: 1.2em;
  }
  .item-menu{
    background: #FAFAFA;
    border: 1px solid #BDBDBD;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 250px;
    z-index: 999999;
  }

  .item-menu li {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
    padding: 5px 15px;
    cursor: pointer;
  }

  .item-menu li:last-child {
    border-bottom: none;
  }

  .item-menu li:hover {
    background: #41B883;
    color: #FAFAFA;
  }
  
  .draggable {
    position: absolute;
    width: 25px;
    height: 100%;
    left: -19px;
    cursor: move;
    box-sizing: content-box;
    z-index: 100;
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
    opacity: .6;
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
    opacity: .25;
  }

  .item:hover .actionBtns {
    opacity: .8;
  }

  .actionBtns {
    opacity: 0;
    cursor: pointer;
    flex-shrink: 0;
    align-self: center;
    transition: all .3s;
    padding-top: 5px;
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
