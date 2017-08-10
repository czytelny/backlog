<template>
  <Modal :value="newBoardModal"
         title="Add new board"
         @on-ok="submitNewTab"
         @on-cancel="closeNewBoardModal"
         okText="Add"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           ref="newBoardNameInput"
           placeholder="New board name"
           @on-keyup.enter="submitNewTab"
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
      submitNewTab () {
        this.$emit('submitNewTab', this.newBoardName)
      },
      closeNewBoardModal () {
        this.$emit('closeNewBoardModal')
      }
    }
  }
</script>
