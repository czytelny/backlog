<template>
  <div class="emoji-container">
    <div><Input
      v-model="searchEmoji"
      placeholder="Find emoji"
      size="small"/>
    </div>
    <simplebar style="padding:4px;">
    <span class="emoji-icon"
          @click="addEmoji(icon)"
          v-for="(icon, name) in icons"
          :key="name"
    >
      {{icon}}
    </span>
    </simplebar>
  </div>
</template>

<script>
  import simplebar from 'simplebar-vue';

  export default {
    name: 'EmojiSuggest',
    components: {simplebar},
    data () {
      return {
        searchEmoji: ''
      };
    },
    computed: {
      icons () {
        return this.$store.state.boards.addItemEmoji.icons;
      },
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
    height: 180px;
    z-index: 100;
    width: 160px;
    overflow: hidden;
    border-radius: 4px;
    top: 100px;
    right: 99px;
    box-shadow: 0 0 8px #c7c7c7;
    border: 1px solid #cecece;
  }

  .emoji-icon {
    padding: 4px 4px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    display: inline-flex;

  }

  .emoji-icon:hover {
    background-color: #9ba4b2;
    color: white;
  }

</style>
