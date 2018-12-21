<template>
  <Modal id="new-board-modal"
         :value="isVisible"
         title="Add new board"
         okText="Add"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           placeholder="New board name"
           @on-keyup.enter="submitNewBoard"
           v-focus
    ></Input>
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">Cancel</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitNewBoard">Add new board
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'new-board-modal',
    computed: {
      isVisible () {
        return this.$store.state.modals.newBoard.isVisible
      },
      newBoardName: {
        set (val) {
          this.$store.dispatch('setNewBoardName', val)
        },
        get () {
          return this.$store.state.modals.newBoard.name
        }
      }
    },
    methods: {
      resetInput () {
        this.$store.dispatch('resetNewBoardName')
      },
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      submitNewBoard () {
        if (this.newBoardName.trim() === '') {
          this.resetInput()
          this.$Message.warning('Please provide new board name')
          return false
        }
        this.$store
          .dispatch('saveNewBoard', this.newBoardName.trim())
          .then((savedBoardId) => {
            this.closeModal()
            this.$Message.success('Board added')
            this.$store.dispatch('fetchBoards')
            this.$router.push({ path: `/board/${savedBoardId}` })
            this.$store.dispatch('setActiveBoard', savedBoardId)
          })
      },
      closeModal () {
        this.$store.dispatch('hideNewBoardModal')
        this.resetInput()
      }
    }
  }
</script>
