<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item">
    <div v-if="!isEditing">
      <Icon type="minus-round"
            class="movable-icon"
            v-if="!isEditing"
      ></Icon>
      <Checkbox :value="isDone"
                v-if="!isEditing"
                @on-change="changeIsDone">
      <span v-if="!isEditing"
      > {{text}}</span>
      </Checkbox>
      <span class="creationDate">{{created | simpleDate}}</span>
    </div>
    <input v-if="isEditing"
           type="text"
           v-model="draftText"
           ref="editableItem"
           @keyup.enter="saveItem"
           v-on:blur="saveItem"
           class="draftText animated fadeIn">
    <span class="actionBtns" v-if="!isEditing">
          <Tooltip content="Edit" :delay="1000" placement="top-end" :transfer="true">
            <Button icon="edit"
                    v-if="!isDone"
                    shape="circle"
                    size="small"
                    type="dashed"
                    @click="editItem">
            </Button>
          </Tooltip>
          <Tooltip content="Remove" :delay="1000" placement="top-end" :transfer="true">
           <Button icon="ios-trash-outline"
                   shape="circle"
                   size="small"
                   type="dashed"
                   @click="removeItem"></Button>
          </Tooltip>
          </span>
  </div>
</template>

<script>
  export default {
    name: 'board-item',
    props: ['itemId', 'isDone', 'text', 'created'],
    data () {
      return {
        isEditing: false,
        draftText: this.text
      }
    },
    methods: {
      saveItem () {
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
    border-bottom: 1px solid #f0f0f0;
    cursor: move;
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

  .item:hover .movable-icon {
    opacity: .25;
  }

  .movable-icon {
    position: absolute;
    left: -15px;
    top: 8px;
    transform: rotate(90deg);
    font-size: 2em;
    opacity: .0;
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

</style>
