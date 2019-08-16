<template>
  <Modal id="langSettings"
         :value="isVisible"
         :title="$t('modals.language')"
         @on-visible-change="visibleChange"
  >
    <div
        v-for="lang in languages"
        :key="lang.code"
        class="lang-pick"
        :class="{active: isLangActive(lang.code)}" @click="changeLocale(lang.code)">
      <img :src="getImage(lang.code)" class="flag-icon"/>
      {{lang.label}}
    </div>
    <div slot="footer">
      <Button
          type="primary"
          size="large"
          @click="closeModal">{{$t("common.ok")}}
      </Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "LanguageModal",
    computed: {
      isVisible() {
        return this.$store.state.modals.language.isVisible;
      },
      selectedLanguage() {
        return this.$store.state.settings.language;
      },
      languages() {
        return this.$store.state.settings.languages;
      },
    },
    methods: {
      changeLocale(code) {
        this.$store.dispatch("changeLanguage", code);
        this.$i18n.locale = code;
      },
      getImage(code) {
        return require(`./../../assets/flags/${code}.svg`);
      },
      isLangActive(code) {
        if (!this.selectedLanguage && code === "en") {
          return true;
        }
        return code === this.selectedLanguage;
      },
      visibleChange(isVisible) {
        if (!isVisible) {
          this.closeModal();
        }
      },
      closeModal() {
        this.$store.dispatch("hideLanguageModal");
      },
    },
  };
</script>

<style scoped>
  .lang-pick {
    display: flex;
    align-items: center;
    margin: 8px 0;
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all .2s;
  }

  .lang-pick.active {
    font-weight: bold;
    color: #000;
  }

  .lang-pick:hover {
    box-shadow: 0 0 16px #e9e9e9;
  }

  .flag-icon {
    width: 22px;
    margin-right: 8px;
    box-shadow: 0 1px 6px #9a9a9a;
  }

</style>
