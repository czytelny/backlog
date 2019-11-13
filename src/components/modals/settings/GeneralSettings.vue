<template>
  <div>
    <div class="row">
      <Checkbox v-model="itemCreationDate">
        {{$t('modals.show_creation_date_for_each_item')}}
      </Checkbox>
    </div>
    <div class="row">
      <Checkbox v-model="minimizeToTray">
        {{$t('modals.minimize_to_tray')}}
      </Checkbox>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'GeneralSettings',
    computed: {
      darkTheme: {
        get () {
          return this.$store.state.settings.darkTheme;
        },
        set (val) {
          this.$store.dispatch('setDarkTheme', val);
          this.showSuccessNotification();
        }
      },
      itemCreationDate: {
        get () {
          return this.$store.state.settings.itemCreationDate;
        },
        set (val) {
          this.$store.dispatch('setItemCreationDate', val);
          this.showSuccessNotification();
        }
      },
      minimizeToTray: {
        get () {
          return this.$store.state.settings.minimizeToTray;
        },
        set (val) {
          this.$store.dispatch('setMinimizeToTray', val);
          this.showSuccessNotification();
        }
      }
    },
    methods: {
      showSuccessNotification () {
        this.$Message.success(this.$t('modals.setting_updated'));
        this.$emit('settingsUpdated');
      }
    }
  };
</script>

<style scoped>
  .row {
    margin: 7px 0;
  }
</style>
