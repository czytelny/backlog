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
    props: ['isVisible'],
    data () {
      return {
        newBoardName: ''
      }
    },
    methods: {
      resetInput () {
        this.newBoardName = ''
      },
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      submitNewBoard () {
        if (this.newBoardName.trim() === '') {
          this.resetInput()
          return false
        }
        this.$store
          .dispatch('saveNewBoard', this.newBoardName)
          .then((savedBoardId) => {
            this.$nextTick(() => this.$bus.$emit('boardAdded', savedBoardId))
            this.closeModal()
            this.$Message.success('Board added')
            this.$emit('newBoardSubmitted')
          })
      },
      closeModal () {
        this.$store.dispatch('hideNewBoardModal')
        this.resetInput()
      }
    }
  }
</script>
