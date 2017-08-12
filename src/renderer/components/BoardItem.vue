<template>
  <div :class="{'doneItem': isDone}"
       class="item list-complete-item">
    <Checkbox :value="isDone"
              @on-change="changeIsDone">
      {{text}}
    </Checkbox>
    <span class="removeItem">
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
      return {}
    },
    methods: {
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
    border-bottom: 1px solid #e3e3e3;
    cursor: move;
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
    transition: all .7s;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    cursor: pointer;
  }

  .item label:hover {
    border-top: 1px solid #47B784;
    border-bottom: 1px solid #47B784;
  }

</style>
