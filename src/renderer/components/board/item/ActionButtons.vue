<template>
  <span class="icon-more">
    <Dropdown @on-click="handleClick" :transfer="true">
    <Icon type="md-more" size="24"/>

    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem name="moveToTop">
        <Icon type="arrow-up-b"></Icon>
        Move to top
      </DropdownItem>
      <DropdownItem name="moveToBottom">
        <Icon type="arrow-down-b"></Icon>
        Move to bottom
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

<style>
  .dropdown-menu {
    z-index: 100;
  }

  .delete-btn {
    font-size: .9em;
    line-height: .7em;
    opacity: .35;
  }

  .icon-more {
    opacity: 0;
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
  }

  .item:hover .icon-more {
    opacity: .5;
  }

  .item:hover .icon-more:hover {
    opacity: 1;
  }
</style>
