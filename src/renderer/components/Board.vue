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
          <Checkbox v-model="prepend"
                    @on-change="focusOnInput">
            <span v-if="!prepend">Adding to tail</span><span v-if="prepend">Adding to head</span>
          </Checkbox>
        </Form-item>
        </Col>
      </Row>
    </Form>

    <draggable :list="boardItems">
      <transition-group name="list-complete">
        <div v-for="item in boardItems"
             :key="item.id"
             class="item list-complete-item"
             :class="{'doneItem': item.isDone}">
          <Checkbox :key="item.id" v-model="item.isDone" @on-change="changedIsDone">{{item.text}}</Checkbox>
          <span class="removeItem">
            <Button icon="ios-trash-outline"
                    shape="circle"
                    size="small"
                    type="dashed"
                    @click="removeItem(item)"></Button>
          </span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import XXH from 'xxhashjs'

  const storage = require('electron').remote.require('electron-settings')

  export default {
    name: 'board',
    props: ['boardId', 'selectedTab'],
    components: {draggable},
    data () {
      return {
        boardItems: [],
        newTodoItem: '',
        prepend: false,
        isSubmittingNewItem: false
      }
    },
    computed: {
      isActive () {
        return this.boardId === this.selectedTab
      }
    },
    methods: {
      changedIsDone () {
        this.saveBoardItems()
      },
      submitNewItem () {
        if (this.newTodoItem.length === 0) {
          return
        }
        this.isSubmittingNewItem = true
        const newBoardItem = {
          id: XXH.h32(this.newTodoItem, 0xABCD).toString(16),
          text: this.newTodoItem,
          isDone: false
        }
        if (this.prepend) {
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
      removeItem (item) {
        const indexToRemove = this.boardItems.findIndex(el => el.id === item.id)
        if (indexToRemove !== -1) {
          this.boardItems.splice(indexToRemove, 1)
          this.saveBoardItems()
        }
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
            vm.$refs['mainInput'].focus()
          }, 250)
        }
      })
      this.fetchBoardItems()
    }
  }
</script>

<style>
  .tab-content {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
  
  .item {
    border-bottom: 1px solid #cecece;
    cursor: pointer;
    position: relative;
  }

  .item.doneItem {
    opacity: .25;
  }

  .removeItem {
    position: absolute;
    right: 5px;
    top: 35%;
    opacity: 0.35;
    cursor: pointer;
  }

  .removeItem:hover {
    opacity: 1;
  }

  .item label {
    padding: 10px;
    font-size: 1.3em;
  }


  .list-complete-move {
    transition: transform .75s;
  }

  .list-complete-item {
    transition: all .75s;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
  }
</style>
