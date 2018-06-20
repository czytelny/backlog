<template>
  <Dropdown class="actions-dropdown" trigger="click">
    <Button icon="android-more-vertical"
            shape="circle"
            size="small"
            type="dashed"
    />
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem>Move to top</DropdownItem>
      <DropdownItem>Move to bottom</DropdownItem>
      <DropdownItem>Move to...</DropdownItem>
      <DropdownItem divided>Delete</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: 'ActionButtons'
  }
</script>

<style scoped>
  .dropdown-menu {
    z-index: 100;
  }
</style>
