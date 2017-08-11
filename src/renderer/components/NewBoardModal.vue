<template>
  <Modal :value="newBoardModal"
         title="Add new board"
         @on-ok="submitNewBoard"
         @on-cancel="closeNewBoardModal"
         okText="Add"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           placeholder="New board name"
           @on-keyup.enter="submitNewBoard"
           v-focus
    />
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
