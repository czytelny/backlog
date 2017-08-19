<template>
  <Modal :value="isVisible"
         title="Settings"
         @on-ok="closeSettingsModal"
         :closable="false"
         okText="Add"
         :scrollable="true"
  >

    <h4>Setup board names and order</h4>
    <draggable :list="boards" @change="saveBoards">
      <div v-for="board in boards" class="board" :key="board.id">
        <Icon type="minus-round" class="movable-icon" ></Icon>
        <Input v-model="board.label" style="width: 300px" @on-blur="saveBoards"/>
      </div>
    </draggable>

    <div slot="footer">
      <Button size="large" @click="closeSettingsModal">Close</Button>
    </div>
  </Modal>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'settings-modal',
    props: ['isVisible', 'boards'],
    components: {
      draggable
    },
    data () {
      return {
        filePath: ''
      }
    },
    methods: {
      saveBoards () {
        this.$emit('saveBoards')
      },
      closeSettingsModal () {
        this.$emit('closeSettingsModal')
        this.$emit('forceReload')
      }
    }
  }
</script>

<style scoped>
  h4 {
    margin: 5px 0;
  }

  .board {
    position: relative;
    margin: 2px 0;
    padding: 2px;
    cursor: move;
    transition: all .3s;
  }

  .board:hover .movable-icon {
    opacity: .55;
  }
</style>
