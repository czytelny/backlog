<template>
  <div class="tab-content">
    <Form inline>
      <Row>
        <Col span="18">
        <Form-item style="width: 95%;">
          <Input v-if="isActive"
                 :autofocus="true"
                 ref="mainInput"
                 v-model="newTodoItem"
                 placeholder="Type and hit Enter"
                 size="large"
                 @on-keyup.enter="submitNewItem"
                 icon="plus">
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

    <draggable :list="items">
      <transition-group name="flip-list">
        <div v-for="item in items "
             :key="item.id"
             class="item">
          <Checkbox v-model="item.isDone">{{item.text}}</Checkbox>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'board',
    props: ['boardId', 'items', 'selectedTab'],
    components: {draggable},
    data () {
      return {
        newTodoItem: '',
        prepend: false
      }
    },
    computed: {
      isActive () {
        return this.boardId === this.selectedTab
      }
    },
    methods: {
      submitNewItem () {
        this.$emit('submitNewItem', this.newTodoItem, this.boardId, this.prepend)
        this.newTodoItem = ''
      }
    },
    watch: {
      isActive () {
        if (this.isActive) {
          setTimeout(() => {
            this.$refs['mainInput'].focus()
          }, 250)
        }
      }
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

  .item label {
    padding: 10px;
    font-size: 1.3em;
  }

  .flip-list-move {
    transition: transform 1s;
  }
</style>
