<template>
  <div class="tab-content">
    <Form inline>
      <Row>
        <Col span="18">
        <Form-item style="width: 95%;">
          <Input :autofocus="true"
                 ref="mainInput"
                 v-model="newTodoItem"
                 placeholder="Type and hit Enter"
                 size="large"
                 @on-keyup.enter="submitNewItem"
                 icon="plus"
                 class="animated"
                 :class="{'fadeOutDown': isSubmittingNewItem, 'fadeIn': !isSubmittingNewItem}">
          </Input>
        </Form-item>
        </Col>
        <Col span="6">
        <Form-item style="width:100%;">
          <i-switch :value="prependNewItem"
                    @on-change=" prependNewItemChange(); focusOnInput();"
                    size="large">
            <span slot="open">Head</span>
            <span slot="close">Tail</span>
          </i-switch>
        </Form-item>
        </Col>
      </Row>
    </Form>
    <div class="showDoneLink">
      <Button v-if="!showDone"
              type="dashed"
              shape="circle"
              @click="switchShowDone">Show done
      </Button>
      <Button v-if="showDone"
              type="dashed"
              shape="circle"
              @click="switchShowDone">
        Hide done
      </Button>
    </div>
    <draggable :list="boardItems" @change="boardItemsRearanged">
      <transition-group name="list-complete">
        <board-item v-for="item in boardItems"
                    :key="item.id"
                    :itemId="item.id"
                    :isDone="item.isDone"
                    :text="item.text"
                    v-if="shouldBeDisplayed(item)"
                    @changeIsDone="changeIsDone"
                    @removeItem="removeItem"
                    @changeItemVal="changeItemVal"
                    >
        </board-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import XXH from 'xxhashjs'
  import BoardItem from './BoardItem.vue'

  const storage = require('electron').remote.require('electron-settings')

  export default {
    name: 'board',
    props: ['boardId', 'selectedTab', 'showDone', 'prependNewItem'],
    components: {
      BoardItem,
      draggable
    },
    data () {
      return {
        boardItems: [],
        newTodoItem: '',
        isSubmittingNewItem: false,
        isEditingItem: false
      }
    },
    computed: {
      isActive () {
        return this.boardId === this.selectedTab
      }
    },
    methods: {
      boardItemsRearanged () {
        this.saveBoardItems()
      },
      prependNewItemChange () {
        this.$emit('prependNewItemChange', !this.prependNewItem, this.boardId)
      },
      switchShowDone () {
        this.$emit('showDoneSwitched', !this.showDone, this.boardId)
      },
      changeIsDone (itemId, newVal) {
        this.boardItems.find(item => item.id === itemId).isDone = newVal
        this.boardItems = this.boardItems.slice(0)
        this.saveBoardItems()
      },
      shouldBeDisplayed (item) {
        if (!item.isDone) {
          return true
        }
        return this.showDone
      },
      submitNewItem () {
        if (this.newTodoItem.length === 0) {
          return
        }
        this.isSubmittingNewItem = true
        const newBoardItem = {
          id: XXH.h32(this.newTodoItem, new Date().getTime()).toString(16),
          text: this.newTodoItem,
          isDone: false
        }
        if (this.prependNewItem) {
          this.boardItems.unshift(newBoardItem)
        } else {
          this.boardItems.push(newBoardItem)
        }
        this.newTodoItem = ''
        this.saveBoardItems()
        this.$nextTick(() => {
          this.isSubmittingNewItem = false
        })
      },
      removeItem (itemId) {
        const indexToRemove = this.boardItems.findIndex(el => el.id === itemId)
        if (indexToRemove !== -1) {
          this.boardItems.splice(indexToRemove, 1)
          this.saveBoardItems()
          this.focusOnInput()
        }
      },
      changeItemVal (itemId, itemVal) {
        const item = this.boardItems.find(el => el.id === itemId)
        if (item) {
          item.text = itemVal
          this.boardItems = this.boardItems.slice(0)
          this.saveBoardItems()
        }
        this.focusOnInput()
      },
      focusOnInput () {
        this.$refs['mainInput'].focus()
      },
      saveBoardItems () {
        storage.set(`board-item-${this.boardId}`, this.boardItems)
      },
      fetchBoardItems () {
        if (storage.has(`board-item-${this.boardId}`)) {
          this.boardItems = storage.get(`board-item-${this.boardId}`)
        }
      }
    },
    watch: {
      selectedTab () {
        if (this.isActive) {
          setTimeout(() => {
            this.$refs['mainInput'].focus()
          }, 250)
        }
      }
    },
    created () {
      const vm = this
      this.$bus.$on('boardAdded', function (boardId) {
        if (vm.boardId === boardId) {
          setTimeout(() => {
            if (vm.$refs['mainInput']) {
              vm.$refs['mainInput'].focus()
            }
          }, 250)
        }
      })
      this.fetchBoardItems()
    }
  }
</script>

<style>
  .showDoneLink {
    text-align: center;
  }

  .tab-content {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }

  .list-complete-move {
    transition: transform .5s;
  }

  .list-complete-item {
    transition: all .5s;
    margin-right: 10px;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(10px);
  }

  .list-complete-leave-active {
  }
</style>
