<template>
  <Modal :value="isMoveToBoardModalVisible"
         title="Choose the board"
         @on-visible-change="switchFlagIfOpened"
  >
    <div class="board-item"
         v-for="board in boards"
         @click="moveToBoard(board.id)"
         :class="{'board-disabled': boardId === board.id}"
    >
      {{board.label}}
    </div>

    <div slot="footer">
      <Button @click="cancelBoardChoose">Cancel</Button>
    </div>
  </Modal>
</template>

<script>
  import boardsRepository from '@/repositories/boardsRepository'

  export default {
    name: 'MoveToBoardModal',
    props: ['boardId'],
    computed: {
      boards () {
        return boardsRepository.getList()
      },
      isMoveToBoardModalVisible () {
        return this.$store.state.modals.moveToBoard.isVisible
      }
    },
    methods: {
      switchFlagIfOpened (isVisible) {
        if (!isVisible) {
          this.cancelBoardChoose()
        }
      },
      cancelBoardChoose () {
        this.$store.dispatch('hideMoveToBoardModal')
      },
      moveToBoard (boardId) {
        if (boardId === this.boardId) {
          return
        }
        this.$emit('moveTo', boardId)
        this.$store.dispatch('hideMoveToBoardModal')
      }
    }
  }
</script>

<style scoped>
  .board-item {
    padding: 10px;
    border-bottom: 1px dashed #f3f3f3;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: .8;
  }

  .board-item:hover {
    padding: 10px;
    border-bottom: 1px dashed #cecece;
    cursor: pointer;
    background-color: rgba(72, 203, 145, 0.06)
  }

  .board-item.board-disabled {
    background-color: inherit;
    cursor: not-allowed;
    opacity: .5;
  }

  .board-item.board-disabled:hover {
    background-color: inherit;
    cursor: not-allowed;
    opacity: .5;
  }

</style>
