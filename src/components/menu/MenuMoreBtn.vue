<template>
    <span class="icon-more">
    <Dropdown @on-click="handleClick" :transfer="true">
    <Icon type="ios-more-outline" size="24"/>
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem name="rename">
       <Icon type="md-create"/>
          Rename
      </DropdownItem>
      <DropdownItem name="duplicate">
        <Icon type="ios-copy-outline"/>
          Duplicate
      </DropdownItem>
      <DropdownItem class="delete-btn" name="remove">
        <Icon type="ios-trash-outline"></Icon>
        Delete
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  </span>
</template>

<script>
  export default {
    name: 'MenuMoreBtn',
    props: ['label', 'boardId'],
    methods: {
      handleClick (val) {
        switch (val) {
          case 'remove':
            this.remove();
            break;
          case 'duplicate':
            break;
          case 'rename':
            this.$store.dispatch('showRenameBoardModal', {
              currentBoardName: this.label,
              boardId: this.boardId
            });

            break;
        }
      },
      remove () {
        this.$Modal.confirm({
          title: `Removing board`,
          okText: 'Cancel',
          cancelText: 'Yes, remove it',
          content: `<p>You are going to remove board <strong>"${this.label}"</strong></p>
                    <p>All items will be deleted, are you sure ?</p>`,
          onCancel: () => {
            this.$store.dispatch('removeBoard', this.boardId);
            this.$store.dispatch('fetchBoards');
            this.$store.dispatch('setFirstBoardAsActiveBoard')
              .then((boardId) => {
                this.$router.push({path: `/board/${boardId}`});
              });
            this.$Message.info('Board removed');
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
