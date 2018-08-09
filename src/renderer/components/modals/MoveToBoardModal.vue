<template>
  <Modal :value="isMoveToBoardModalVisible"
         :title="movingTitle"
         @on-visible-change="switchFlagIfOpened"
  >
    <h4>Choose the destination board:</h4>
    <div class="board-item"
         v-for="board in boards"
         @click="moveToBoard(board.id)"
         :class="{'board-disabled': activeBoardId === board.id}"
    >
      {{board.label}}
    </div>

    <div slot="footer">
      <Button @click="cancelBoardChoose">Cancel</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'MoveToBoardModal',
    computed: {
      movingTitle () {
        return `Moving: ${this.movingItemText}  `
      },
      boards () {
        return this.$store.state.boards.boardsList
      },
      isMoveToBoardModalVisible () {
        return this.$store.state.modals.moveToBoard.isVisible
      },
      activeBoardId () {
        return this.$store.state.boards.activeBoard
      },
      movingItemId () {
        return this.$store.state.modals.moveToBoard.movingItemId
      },
      movingItemText () {
        return this.$store.state.modals.moveToBoard.movingItemText
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
        if (boardId === this.activeBoardId) {
          return
        }
        this.$store.dispatch('moveItemToBoard', {
          fromBrd: this.activeBoardId,
          toBrd: boardId,
          movingItemId: this.movingItemId
        }).then(() => {
          this.$bus.$emit('itemMoved', this.activeBoardId)
        })
        this.$store.dispatch('hideMoveToBoardModal')
      }
    }
  }
</script>

<style scoped>
  .board-item {
    padding: 10px;
    border-bottom: 1px solid #e9eaec;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: .9;
    border-radius: 3px;
  }

  .moving-item-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .board-item:hover {
    padding: 10px;
    border-bottom: 1px solid #cecece;
    cursor: pointer;
    background-color: #ebf7ff;
  }

  .board-item.board-disabled {
    background-color: #e0dee2;
    cursor: not-allowed;
    opacity: .5;
  }

  .board-item.board-disabled:hover {
    background-color: #e0dee2;
    cursor: not-allowed;
    opacity: .5;
  }


</style>
