<template>
  <Modal id="new-board-modal"
         :value="isVisible"
         :title="$t('modals.add_new_board')"
         @on-visible-change="visibleChange"
  >
    <Input v-model="newBoardName"
           element-id="newBoardNameInput"
           :placeholder="$t('modals.new_board_name')"
           @on-keyup.enter="submitNewBoard"
           v-focus/>
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">{{$t("common.cancel")}}</Button>
      <Button id="saveNewBoardBtn"
              type="primary"
              size="large"
              @click="submitNewBoard">{{$t("modals.add_new_board")}}
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "new-board-modal",
    computed: {
      isVisible() {
        return this.$store.state.modals.newBoard.isVisible;
      },
      newBoardName: {
        set(val) {
          this.$store.dispatch("setNewBoardName", val);
        },
        get() {
          return this.$store.state.modals.newBoard.name;
        }
      }
    },
    methods: {
      resetInput() {
        this.$store.dispatch("resetNewBoardName");
      },
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      submitNewBoard() {
        if (this.newBoardName.trim() === "") {
          this.resetInput();
          this.$Message.warning(this.$t('modals.provide_new_board_name'));
          return false;
        }
        this.$store
          .dispatch("saveNewBoard", this.newBoardName.trim())
          .then((savedBoardId) => {
            this.closeModal();
            this.$Message.success(this.$t('modals.board_added'));
            this.$store.dispatch("fetchBoards");
            this.$router.push({path: `/board/${savedBoardId}`});
            this.$store.dispatch("setActiveBoard", savedBoardId);
          });
      },
      closeModal() {
        this.$store.dispatch("hideNewBoardModal");
        this.resetInput();
      }
    }
  };
</script>
