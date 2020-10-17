<template>
  <span class="icon-more" >
    <Dropdown @on-click="handleClick" :transfer="true">
    <Icon type="ios-more-outline" size="24"/>
    <DropdownMenu slot="list" class="dropdown-menu">
      <DropdownItem name="moveToTop">
       <Icon type="ios-arrow-dropup"/>
          {{$t("item.move_to_top")}}
      </DropdownItem>
      <DropdownItem name="moveToBottom">
        <Icon type="ios-arrow-dropdown"/>
          {{$t("item.move_to_bottom")}}
      </DropdownItem>
      <DropdownItem v-if="!isImportant" name="markImportant">
       <Icon type="ios-add" />
          {{$t("item.mark_important")}}
      </DropdownItem>
      <DropdownItem v-if="isImportant" name="markUnimportant">
       <Icon type="ios-close" />
          {{$t("item.mark_unimportant")}}
      </DropdownItem>
      <DropdownItem class="delete-btn" name="remove">
        <Icon type="ios-trash-outline"/>
          {{$t("item.delete")}}
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  </span>
</template>

<script>
  export default {
    name: "ActionButtons",
    props: ['isImportant'],
    data(){
      return{
        localisImportant: this.isImportant
      }
    },
    methods: {
      handleClick(val) {
        switch (val) {
          case "remove":
            this.remove();
            break;
          case "moveToTop":
            this.moveToTop();
            break;
          case "moveToBottom":
            this.moveToBottom();
            break;
          case "markUnimportant":
            this.Important = true;
            this.changeToFalse();
            break;
          case "markImportant":
            this.Important = false;
            this.changeToTure();
            break;
        }
      },
      changeToTure(){
        this.$emit("changeImportant", true)
      },
      changeToFalse(){
        this.$emit("changeImportant", false)
      },
      remove() {
        this.$emit("remove");
      },
      moveToTop() {
        this.$emit("moveToTop");
      },
      moveToBottom() {
        this.$emit("moveToBottom");
      },
    },
  };

</script>

<style>
  .dropdown-menu {
    z-index: 100;
  }

  .delete-btn {
    color: #DC4E2B;
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

  .icon-more i {
    transition: all .3s;
  }

  .icon-more i:hover {
    transform: rotate(90deg);
  }

  .item:hover .icon-more {
    opacity: .5;
  }

  .item:hover .icon-more:hover {
    opacity: 1;
  }
</style>
