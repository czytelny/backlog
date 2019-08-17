<template>
  <Modal id="duplicate-board-modal"
         :value="isVisible"
         :title="$t('modals.duplicate_board')"
         @on-visible-change="visibleChange"
  >
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           :placeholder="$t('modals.new_board_name')"
           @on-keyup.enter="submitBoardDuplication"
           v-focus
    />
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">{{$t('common.cancel')}}</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitBoardDuplication">
        {{$t('modals.duplicate')}}
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "DuplicateBoardModal",
    computed: {
      isVisible() {
        return this.$store.state.modals.duplicateBoard.isVisible;
      },
      newBoardName: {
        set(val) {
          this.$store.dispatch("setDuplicatedBoardName", val);
        },
        get() {
          return this.$store.state.modals.duplicateBoard.name;
        }
      }
    },
    methods: {

      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      submitBoardDuplication() {
        if (this.newBoardName.trim() === "") {
          this.$Message.warning(this.$t('modals.provide_new_board_name'));
          return false;
        }
        this.$store
          .dispatch("duplicateBoard", {
            newName: this.newBoardName.trim(),
            boardId: this.$store.state.modals.duplicateBoard.boardId
          })
          .then(() => {
            this.closeModal();
            this.$Message.success(this.$t('modals.board_duplicated'));
            this.$store.dispatch("fetchBoards");
          });
      },
      closeModal() {
        this.$store.dispatch("hideDuplicateBoard");
      }
    }
  };
</script>

<style scoped>

</style>
