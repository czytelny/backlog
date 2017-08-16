<template>
  <div :class="{'doneItem': isDone, 'isEditing': isEditing}"
       class="item list-complete-item">
    <Checkbox :value="isDone"
              v-if="!isEditing"
              @on-change="changeIsDone">
      <span v-if="!isEditing"
      > {{text}}</span>
    </Checkbox>
    <input v-if="isEditing"
           type="text"
           v-model="draftText"
           ref="editableItem"
           @keyup.enter="saveItem"
           v-on:blur="saveItem"
           class="draftText animated fadeIn">
    <span class="actionBtns" v-if="!isEditing">
            <Button icon="edit"
                    v-if="!isDone"
                    shape="circle"
                    size="small"
                    type="dashed"
                    @click="editItem">
            </Button>
      <Button icon="ios-trash-outline"
              shape="circle"
              size="small"
              type="dashed"
              @click="removeItem"></Button>
          </span>
  </div>
</template>

<script>
  export default {
    name: 'board-item',
    props: ['itemId', 'isDone', 'text'],
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
    }
  }
</script>

<style>
  .item {
    border-bottom: 1px solid #f0f0f0;
    cursor: move;
    position: relative;
    height: 40px;
  }

  .item.doneItem {
    opacity: .25;
  }

  .actionBtns {
    position: absolute;
    right: 5px;
    top: 35%;
    opacity: 0.45;
    cursor: pointer;
  }

  .actionBtns:hover {
    opacity: 1;
  }

  .item label {
    margin-top: 15px;
    padding-left: 5px;
    font-size: 1.3em;
    transition: all .7s;
    border-left: 2px solid transparent;
    cursor: pointer;
    line-height: 14px;
  }

  .item label:hover {
    border-left: 2px solid #47B784;
  }

  .isEditing {
    border-bottom: 1px dashed #2D8CF0;
  }

  .draftText {
    border: 0;
    line-height: 14px;
    margin-top: 12px;
    margin-left: 20px;
    padding-left: 5px;
    font-size: 1.3em;
    transition: all .7s;
    width: 90%;
  }

  .draftText:focus {
    outline: none;
  }

</style>
