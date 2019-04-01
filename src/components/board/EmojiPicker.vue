<template>
  <div class="emoji-container">
    <span class="emoji-icon"
          @click="addEmoji(icon)"
          v-for="(icon, name) in icons"
          :key="name"
    >
      {{icon}}
    </span>
  </div>
</template>

<script>
  import EmojiIcons from './../../assets/emojiIcons';

  export default {
    name: 'EmojiSuggest',
    components: {
    },
    data () {
      return {
        searchEmoji: '',
        icons: EmojiIcons.People
      };
    },
    methods: {
      addEmoji (val) {
        this.$emit('addEmoji', val);
      }
    }
  };
</script>

<style scoped>
  .emoji-container {
    position: absolute;
    background: white;
    height: 150px;
    z-index: 1000000;
    width: 150px;
    overflow: hidden;
    padding: 8px;
    border: 1px solid #2C2E32;
    border-radius: 3px;
    top:100px;
  }

  .emoji-icon {
    font-size: 16px;
    cursor: pointer;
  }
</style>
