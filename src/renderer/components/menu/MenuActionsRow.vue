<template>
  <div class="menu-actions-row">
    <Tooltip content="Keymap" placement="bottom" :transfer="true" class="tooltip-height">
        <span @click="showKeymap">
            <img src="./../../assets/icon/keymap.svg" alt="Keymap" class="action-icon"/>
        </span>
    </Tooltip>
    <Tooltip content="Cloud - unset" placement="bottom" :transfer="true" class="tooltip-height">
      <img src="./../../assets/icon/cloud_unset.svg" alt="Keymap" class="action-icon"/>
    </Tooltip>
    <Tooltip content="Application Settings" placement="bottom" :transfer="true" class="tooltip-height">
      <img src="./../../assets/icon/settings.svg" alt="Keymap" class="action-icon"/>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'MenuActionsRow',
    methods: {
      showKeymap () {
        this.$store.dispatch('showKeymapModal')
      },
      showSettingsModal () {
        // this.$store.dispatch('showSettingsModal')
        this.$Message.error('Sorry, not available in Alpha version')
      }
    }
  }
</script>

<style scoped>
  .menu-actions-row {
    padding: 8px 32px;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    justify-content: space-around;
    align-items: center;
    background-color: #565a61;
    width: 100%;
  }

  .tooltip-height {
    height: 24px;
  }

  .action-icon {
    color: #2C2E32;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    opacity: .6;
    cursor: pointer;
    filter: drop-shadow(0 0 2px rgba(70, 70, 70, 0.8));
  }

  .action-icon:hover {
    opacity: 1;
    color: #2C2E32;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
  }

  i {
    padding-left: 8px;
    cursor: pointer;
  }

  i:hover {
    color: #fff;
  }

  svg {
    cursor: pointer;
    margin-top: 2px;
  }

  svg:hover {
    color: #fff;
  }

</style>
