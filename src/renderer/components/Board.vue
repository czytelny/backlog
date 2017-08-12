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
          <Checkbox v-model="prepend">Add to beginning</Checkbox>
        </Form-item>
        </Col>
      </Row>
    </Form>

    <draggable :list="boardItems">
      <transition-group name="flip-list">
        <div v-for="item in boardItems"
             :key="item.id"
             class="item"
             :class="{'doneItem': item.isDone}">
          <Checkbox :key="item.id" v-model="item.isDone" @on-change="changedIsDone">{{item.text}}</Checkbox>
          <pre>{{item.isDone}}</pre>
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
  }

  .doneItem label {
    text-decoration: line-through;
  }

  .item label {
    padding: 10px;
    font-size: 1.3em;
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
