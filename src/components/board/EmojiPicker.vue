<template>
  <div class="emoji-container">
    <div>
      <Input
        v-model="searchEmoji"
        placeholder="Find emoji"
        ref="searchEmojiInput"
        @keydown.right.native="incIndex"
        @keydown.left.native="decrIndex"
        @keydown.up.native="decrIndexRow"
        @keydown.down.native="incIndexRow"
        @keyup.enter.native="addActiveEmoji"
        @keyup.esc.native="closeEmoji"
        style="margin-bottom:4px;"
        size="small"/>
    </div>
    <simplebar class="emoji-simplebar-container" style="padding:4px;">
      <div
        @click="addEmoji(emoji)"
        class="emoji-icon"
        v-for="(emoji, emojiName, index) in icons"
        :class="{'active' : index === activeIndex}"
        :key="emojiName"
      >{{ emoji }}
      </div>
    </simplebar>
    {{activeIndex}}
  </div>
</template>

<script>
  import simplebar from 'simplebar-vue';
  import VueScrollTo from 'vue-scrollto';

  export default {
    name: 'EmojiSuggest',
    components: {simplebar},
    data () {
      return {
        searchEmoji: '',
        activeIndex: 0
      };
    },
    watch: {
      searchEmoji () {
        this.activeIndex = 0;
      }
    },
    computed: {
      emojiLength () {
        return Object.keys(this.icons).length;
      },
      icons () {
        if (this.searchEmoji) {
          const obj = {};
          for (const emoji in this.emojiTable) {
            if (emoji.includes(this.searchEmoji)) {
              obj[emoji] = this.emojiTable[emoji];
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
      incIndex () {
        if (this.activeIndex < this.emojiLength - 1) {
          this.activeIndex++;
          this.scrollToActiveRow();
        }
      },
      incIndexRow () {
        if (this.activeIndex < this.emojiLength - 5) {
          this.activeIndex += 5;
          this.scrollToActiveRow();
        }
      },
      decrIndex () {
        if (this.activeIndex > 0) {
          this.activeIndex--;
          this.scrollToActiveRow();
        }
      },
      decrIndexRow () {
        if (this.activeIndex >= 5) {
          this.activeIndex -= 5;
          this.scrollToActiveRow();
        }
      },
      focusOnSearchInput () {
        if (this.$refs['searchEmojiInput']) {
          this.$refs['searchEmojiInput'].focus();
        }
      },
      scrollToActiveRow () {
        const el = document.querySelector('.emoji-icon.active');
        if (el) {
          var options = {
            container: '.emoji-simplebar-container .simplebar-content',
            easing: 'linear',
            offset: -60,
            force: true,
            cancelable: true,
            x: false,
            y: true
          };
          VueScrollTo.scrollTo(el, 10, options);
        }
      },
      addEmoji (val) {
        this.$emit('addEmoji', val);
      },
      closeEmoji () {
        this.$emit('closeEmoji');
      },
      addActiveEmoji () {
        const el = document.querySelector('.emoji-icon.active');
        this.addEmoji(el.innerText);
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
    padding: 0 2px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 4px;
    display: inline-flex;
  }

  .emoji-icon.active {
    background-color: #9ba4b2;
    color: white;
  }

  .emoji-icon:hover {
    background-color: #9ba4b2;
    color: white;
  }

</style>
