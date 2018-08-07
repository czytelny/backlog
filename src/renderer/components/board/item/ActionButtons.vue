<template>
  <span>
    <Dropdown @on-click="handleClick" :transfer="true">
    <Button icon="android-more-vertical"
            shape="circle"
            size="small"
            type="dashed"
            tabindex="-1"
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
      <DropdownItem class="delete-btn" name="remove">
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
    computed: {
      boards () {
        return boardsRepository.getList()
      }
    },
    methods: {
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
        this.$emit('showMoveToBoardModal')
      }
    }
  }
</script>

<style scoped>
  .dropdown-menu {
    z-index: 100;
  }

  .delete-btn {
    font-size: .9em;
    line-height: .7em;
    opacity: .35;
  }
</style>
