<template>
  <Dropdown class="actions-dropdown" trigger="click">
    <Button icon="android-more-vertical"
            shape="circle"
            size="small"
            type="dashed"
    />
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem>
        <Icon type="arrow-up-b"></Icon>
        Move to top</DropdownItem>
      <DropdownItem>
        <Icon type="arrow-down-b"></Icon>
        Move to bottom</DropdownItem>
      <DropdownItem>
        <Icon type="arrow-return-right"></Icon>
        Move to...</DropdownItem>
      <DropdownItem divided class="delete-btn">
        <Icon type="trash-b"></Icon>
        Delete</DropdownItem>
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

  .delete-btn{
    font-size: .9em;
    line-height: .7em;
    opacity: .75;
  }

</style>
