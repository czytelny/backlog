<template>
    <div class="boards-actions-row">
      <Tooltip content="Keymap" placement="bottom" :transfer="true">
        <span @click="showKeymap">
            <img src="./../assets/icon/keymap.svg" width="24" alt="Keymap" class="action-icon"/>
        </span>
      </Tooltip>
      <Tooltip content="Cloud Settings" placement="bottom" :transfer="true">
        <Icon type="ios-cloud" size="32" @click="showSettingsModal" class="action-icon"/>
      </Tooltip>
      <Tooltip content="Application Settings" placement="bottom" :transfer="true">
        <Icon type="ios-build" size="32" @click="showSettingsModal" class="action-icon"/>
      </Tooltip>
    </div>
</template>

<script>
  import IconKeyBind from './icons/IconKeyBind'

  export default {
    name: 'BoardsActionsRow',
    components: {IconKeyBind},
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
  .boards-actions-row {
    text-align: right;
    padding: 4px 0;
    display: flex;
    position: absolute;
    bottom: 8px;
    justify-content: space-between;
    width: 180px;
    align-items: center;
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
    filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));
  }
  .action-icon:hover {
    opacity: 1;
    color: #2C2E32;
    filter: drop-shadow(0 0 8px rgba(0,0,0,0.8));
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
