<template>
  <Modal id="rename-board-modal"
         :value="isVisible"
         title="Rename board"
         okText="Add"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           placeholder="New board name"
           @on-keyup.enter="submitBoardRename"
           v-focus
    ></Input>
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">Cancel</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitBoardRename">Rename
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'RenameBoardModal',
    computed: {
      isVisible () {
        return this.$store.state.modals.renameBoard.isVisible
      },
      newBoardName: {
        set (val) {
          this.$store.dispatch('setRenamedBoardName', val)
        },
        get () {
          return this.$store.state.modals.renameBoard.name
        }
      }
    },
    methods: {
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      submitBoardRename () {
        if (this.newBoardName.trim() === '') {
          this.$Message.warning('Please provide new board name')
          return false
        }
        this.$store
          .dispatch('renameBoard', {
            newName: this.newBoardName.trim(),
            boardId: this.$store.state.modals.renameBoard.boardId
          })
          .then(() => {
            this.closeModal()
            this.$Message.success('Board renamed')
            this.$store.dispatch('fetchBoards')
          })
      },
      closeModal () {
        this.$store.dispatch('hideRenameBoardModal')
      }
    }
  }
</script>

<style scoped>

</style>
