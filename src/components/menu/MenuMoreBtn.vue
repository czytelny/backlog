<template>
    <span class="icon-more">
    <Dropdown @on-click="handleClick" :transfer="true">
    <Icon type="ios-more-outline" size="24"/>
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem name="rename">
       <Icon type="md-create"/>
          {{$t("menu.rename")}}
      </DropdownItem>
      <DropdownItem name="duplicate">
        <Icon type="ios-copy-outline"/>
         {{$t("menu.duplicate")}}
      </DropdownItem>
      <DropdownItem class="delete-btn" name="remove">
        <Icon type="ios-trash-outline"></Icon>
        {{$t("menu.delete")}}
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  </span>
</template>

<script>
  export default {
    name: "MenuMoreBtn",
    props: ["label", "boardId"],
    methods: {
      handleClick(val) {
        switch (val) {
          case "remove":
            this.remove();
            break;
          case "duplicate":
            this.$store.dispatch("showDuplicateBoard", {
              currentBoardName: this.label,
              boardId: this.boardId
            });
            break;
          case "rename":
            this.$store.dispatch("showRenameBoardModal", {
              currentBoardName: this.label,
              boardId: this.boardId
            });

            break;
        }
      },
      remove() {
        const title = this.$t("menu.removing_board");
        const cancel = this.$t("common.cancel");
        const yesRemove = this.$t("menu.yes_remove_it");

        this.$Modal.confirm({
          title,
          okText: cancel,
          cancelText: yesRemove,
          content: `<p>${this.$t("menu.you_are_going_to_remove")} <strong>"${this.label}"</strong></p>
                    <p>${this.$t("menu.all_items_will_be_deleted")}</p>`,
          onCancel: () => {
            this.$store.dispatch("removeBoard", this.boardId);
            this.$store.dispatch("fetchBoards");
            this.$store.dispatch("setFirstBoardAsActiveBoard")
              .then((boardId) => {
                this.$router.push({path: `/board/${boardId}`});
              });
            this.$Message.info(this.$t("menu.board_removed"));
          }
        });

      }
    }
  };
</script>

<style scoped>
  .icon-more {
    opacity: 0;
    position: absolute;
    left: -28px;
    top: -5px;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .icon-more >>> i {
    transition: all .3s;
  }

  .icon-more >>> i:hover {
    transform: rotate(90deg);
  }
</style>
