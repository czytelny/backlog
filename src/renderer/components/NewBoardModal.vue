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
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      submitNewBoard () {
        if (this.newBoardName.trim() === '') {
          this.newBoardName = ''
          return false
        }
        this.$emit('submitNewBoard', this.newBoardName)
        this.newBoardName = ''
      },
      closeModal () {
        this.$store.dispatch('hideNewBoardModal')
        this.newBoardName = ''
      }
    }
  }
</script>
