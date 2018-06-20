<template>
  <Dropdown class="actions-dropdown"
            @on-click="handleClick"
  >
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
        Move to...
      </DropdownItem>
      <DropdownItem divided class="delete-btn" name="remove">
        <Icon type="trash-b"></Icon>
        Delete
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: 'ActionButtons',
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
        this.$emit('moveTo')
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
    opacity: .75;
  }

</style>
