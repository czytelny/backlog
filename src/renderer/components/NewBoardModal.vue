<template>
  <Modal id="new-board-modal"
         :value="newBoardModal"
         title="Add new board"
         okText="Add"
         :closable="false"
         :mask-closable="false"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           placeholder="New board name"
           @on-keyup.enter="submitNewBoard"
           v-focus
    />
    <div slot="footer">
      <Button type="text" size="large" @click="closeNewBoardModal">Cancel</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitNewBoard">Add new board</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'new-board-modal',
    props: ['newBoardModal'],
    data () {
      return {
        newBoardName: ''
      }
    },
    methods: {
      submitNewBoard () {
        if (this.newBoardName.trim() === '') {
          this.newBoardName = ''
          return false
        }
        this.$emit('submitNewBoard', this.newBoardName)
        this.newBoardName = ''
      },
      closeNewBoardModal () {
        this.$emit('closeNewBoardModal')
        this.newBoardName = ''
      }
    }
  }
</script>
