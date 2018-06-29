<template>
  <span>
    <Modal
        v-model="boardChooseModal"
        title="Choose the board"
    >
      <div class="board-item"
           v-for="board in boards"
           @click="moveToBoard(board.id)"
           :class="{'board-disabled': boardId === board.id}"
      >
        {{board.label}}
      </div>

      <div slot="footer">
            <Button @click="cancelBoardChoose">Cancel</Button>
      </div>
    </Modal>

    <Dropdown @on-click="handleClick" :transfer="true">
    <Button icon="android-more-vertical"
            shape="circle"
            size="small"
            type="dashed"
    />
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem name="moveToTop">
        <Icon type="arrow-up-b"></Icon>
        Move to top
      </DropdownItem>
      <DropdownItem name="moveToBottom">
        <Icon type="arrow-down-b"></Icon>
        Move to bottom
      </DropdownItem>
      <DropdownItem name="moveTo">
        <Icon type="arrow-return-right"></Icon>
        Move to board...
      </DropdownItem>
      <DropdownItem divided class="delete-btn" name="remove">
        <Icon type="trash-b"></Icon>
        Delete
      </DropdownItem>
    </DropdownMenu>
  </Dropdown></span>
</template>

<script>
  import boardsRepository from '@/repositories/boardsRepository'

  export default {
    name: 'ActionButtons',
    props: ['boardId'],
    data () {
      return {
        boardChooseModal: false
      }
    },
    computed: {
      boards () {
        return boardsRepository.getList()
      }
    },
    methods: {
      cancelBoardChoose () {
        this.boardChooseModal = false
      },
      handleClick (val) {
        switch (val) {
          case 'remove':
            this.remove()
            break
          case 'moveToTop':
            this.moveToTop()
            break
          case 'moveToBottom':
            this.moveToBottom()
            break
          case 'moveTo':
            this.moveTo()
            break
        }
      },
      remove () {
        this.$emit('remove')
      },
      moveToTop () {
        this.$emit('moveToTop')
      },
      moveToBottom () {
        this.$emit('moveToBottom')
      },
      moveTo () {
        this.boardChooseModal = true
      },
      moveToBoard (boardId) {
        if (boardId === this.boardId) {
          return
        }
        this.boardChooseModal = false
        this.$emit('moveTo', boardId)
      }
    }
  }
</script>

<style scoped>
  .board-item {
    padding: 10px;
    border-bottom: 1px dashed #f3f3f3;
    cursor: pointer;
    -webkit-transition: all .3s;
    transition: all .3s;
    opacity: .8;
  }
  
  .board-item:hover {
    padding: 10px;
    border-bottom: 1px dashed #cecece;
    cursor: pointer;
    background-color: rgba(72, 203, 145, 0.06)
  }

  .dropdown-menu {
    z-index: 100;
  }

  .delete-btn {
    font-size: .9em;
    line-height: .7em;
    opacity: .75;
  }

  .board-item.board-disabled {
    background-color: inherit;
    cursor: not-allowed;
    opacity: .5;
  }

  .board-item.board-disabled:hover {
    background-color: inherit;
    cursor: not-allowed;
    opacity: .5;
  }

</style>
