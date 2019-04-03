<template>
  <div class="emoji-container">
    <div>
      <Input
        v-model="searchEmoji"
        placeholder="Find emoji"
        size="small"/>
    </div>
    <simplebar style="padding:4px;">
    <div
          v-for="(emojiGroup, category) in icons"
          :key="category"
    >
      <h5>{{ category }}</h5>
      <span
        @click="addEmoji(emoji)"
        class="emoji-icon"
        v-for="(emoji, emojiName) in emojiGroup"
        :key="emojiName"
        :title="emojiName"
      >{{ emoji }}</span>
    </div>
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
        if (this.searchEmoji) {
          const obj = {};
          for (const category in this.emojiTable) {
            obj[category] = {};
            for (const emoji in this.emojiTable[category]) {
              if (emoji.includes(this.searchEmoji)) {
                obj[category][emoji] = this.emojiTable[category][emoji];
              }
            }
            if (Object.keys(obj[category]).length === 0) {
              delete obj[category];
            }
          }
          return obj;
        }

        return this.emojiTable;
      },
      emojiTable () {
        return this.$store.state.boards.addItemEmoji.icons;
      }
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
