<template>
  <Modal id="duplicate-board-modal"
         :value="isVisible"
         title="Duplicate board"
         okText="Add"
         @on-visible-change="visibleChange"
         cancelText="Cancel">
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           placeholder="New board name"
           @on-keyup.enter="submitBoardDuplication"
           v-focus
    />
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">Cancel</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitBoardDuplication">Duplicate
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'DuplicateBoardModal',
    computed: {
      isVisible () {
        return this.$store.state.modals.duplicateBoard.isVisible;
      },
      newBoardName: {
        set (val) {
          this.$store.dispatch('setDuplicatedBoardName', val);
        },
        get () {
          return this.$store.state.modals.duplicateBoard.name;
        }
      }
    },
    methods: {

      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      submitBoardDuplication () {
        if (this.newBoardName.trim() === '') {
          this.$Message.warning('Please provide new board name');
          return false;
        }
        this.$store
          .dispatch('duplicateBoard', {
            newName: this.newBoardName.trim(),
            boardId: this.$store.state.modals.duplicateBoard.boardId
          })
          .then(() => {
            this.closeModal();
            this.$Message.success('Board duplicated');
            this.$store.dispatch('fetchBoards');
          });
      },
      closeModal () {
        this.$store.dispatch('hideDuplicateBoard');
      }

    }
  };
</script>

<style scoped>

</style>
