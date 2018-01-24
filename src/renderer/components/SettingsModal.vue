<template>
  <Modal :value="isVisible"
         title="Settings"
         @on-ok="closeSettingsModal"
         :closable="false"
         :mask-closable="false"
         okText="Add"
         :scrollable="true"
  >
    <Checkbox v-model="itemCreationDateLocal" @on-change="saveSettings">
      Show creation date for each item
    </Checkbox>

    <div class="separator"></div>
    <h4>Setup board names and order</h4>
    <draggable :list="boardsLocal">
      <div v-for="board in boardsLocal" class="board" :key="board.id">
        <Icon type="minus-round" class="movable-icon"></Icon>
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
  import settingsRepository from '../../repositories/settingsRepository'
  import boardsRepository from '../../repositories/boardsRepository'

  export default {
    name: 'settings-modal',
    props: ['isVisible', 'boards', 'itemCreationDate'],
    components: {
      draggable
    },
    created () {
      this.updateLocalBoards()
    },
    data () {
      return {
        boardsLocal: null,
        itemCreationDateLocal: this.itemCreationDate
      }
    },
    watch: {
      boards: function (newBoards) {
        this.updateLocalBoards()
      }
    },
    methods: {
      saveSettings () {
        settingsRepository.updateAppSettings({itemCreationDate: this.itemCreationDateLocal})
      },
      saveBoards () {
        boardsRepository.saveBoardsArray(this.boardsLocal)
      },
      closeSettingsModal () {
        this.saveBoards()
        this.$emit('closeSettingsModal')
        this.$emit('forceReload')
      },
      updateLocalBoards () {
        this.boardsLocal = JSON.parse(JSON.stringify(this.boards))
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

  .separator {
    border-bottom: 1px solid #f5f5f5;
    margin: 15px 0
  }
</style>
