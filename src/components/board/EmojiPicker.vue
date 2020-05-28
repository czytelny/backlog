<template>
  <div class="emoji-container"
       :class="{'itemAdded' :itemAdded}"
  >
    <div>
      <Input
        v-model="searchEmoji"
        placeholder="Find emoji"
        ref="searchEmojiInput"
        class="searchInput"
        @keydown.right.native="incIndex"
        @keydown.left.native="decrIndex"
        @keydown.up.native="decrIndexRow"
        @keydown.down.native="incIndexRow"
        @keyup.enter.native="addActiveEmoji"
        @keyup.esc.native="closeEmoji"
        style="margin-bottom:4px;"
        clearable
        size="small"/>
    </div>
    <simplebar class="emoji-simplebar-container" style="padding:4px; height: 190px;">
      <div
        v-for="(emoji, emojiName, index) in favEmoji"
        @click="addEmoji({emoji, emojiName})"
        class="emoji-icon fav"
        :class="{'active' : index === activeIndex}"
        :key="emojiName+'fav'"
        :data-name="emojiName"
      >{{ emoji }}
      </div>

      <div
        v-for="(emoji, emojiName, index) in icons"
        @click="addEmoji({emoji, emojiName})"
        class="emoji-icon"
        :class="{'active' : index+favEmojiLength === activeIndex}"
        :key="emojiName"
        :data-name="emojiName"
      >{{ emoji }}
      </div>
    </simplebar>
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
        activeIndex: 0,
        itemAdded: false,
        favEmoji: {}
      };
    },
    watch: {
      searchEmoji () {
        this.activeIndex = 0;
      }
    },
    mounted () {
      this.getFavEmoji();
    },
    computed: {
      emojiLength () {
        return Object.keys(this.icons).length + this.favEmojiLength;
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
      },
      favEmojiLength () {
        return Object.keys(this.favEmoji).length;
      }
    },
    methods: {
      getFavEmoji () {
        let fav = localStorage.getItem('favEmoji');
        if (fav) {
          fav = JSON.parse(fav);
        } else {
          fav = [];
        }
        const obj = {};
        fav.map((emojiName) => {
          return obj[emojiName] = this.emojiTable[emojiName];
        });
        this.favEmoji = obj;
      },
      incIndex () {
        if (this.activeIndex < this.emojiLength - 1) {
          this.activeIndex++;
          this.scrollToActiveRow();
        }
      },
      incIndexRow () {
        if (this.activeIndex < this.emojiLength - 4) {
          this.activeIndex += 4;
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
        if (this.activeIndex >= 4) {
          this.activeIndex -= 4;
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
      addEmoji ({emoji, emojiName}) {
        if (emoji && emojiName) {
          this.$emit('addEmoji', {emoji});
          this.addToFavorite(emojiName);
          this.activeIndex = 0;
          this.itemAdded = true;
          this.getFavEmoji();
          setTimeout(() => {
            this.itemAdded = false;
          }, 300);
        }
      },
      addToFavorite (emojiName) {
        let fav = localStorage.getItem('favEmoji');
        if (!fav) {
          fav = [];
        } else {
          fav = JSON.parse(fav);
        }
        if (fav.length > 7) {
          if (fav.indexOf(emojiName) > -1) {
            fav.splice(fav.indexOf(emojiName), 1);
            fav.unshift(emojiName);
          } else {
            fav.pop();
            fav.unshift(emojiName);
          }
        } else {
          if (fav.indexOf(emojiName) > -1) {
            fav.splice(fav.indexOf(emojiName), 1);
          }
          fav.unshift(emojiName);
        }
        localStorage.setItem('favEmoji', JSON.stringify(fav));
      },
      closeEmoji () {
        this.$emit('closeEmoji');
      },
      addActiveEmoji () {
        const el = document.querySelector('.emoji-icon.active');
        this.addEmoji({emoji: el.innerText, emojiName: el.dataset.name});
        this.closeEmoji();
      }
    }
  };
</script>

<style>
  .emoji-container {
    user-select: none;
    position: absolute;
    background: white;
    height: 220px;
    z-index: 100;
    width: 160px;
    overflow: hidden;
    border-radius: 4px;
    top: 100px;
    right: 99px;
    box-shadow: 0 0 8px #c7c7c7;
    border: 1px solid #cecece;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .emoji-container.itemAdded {
    box-shadow: 0 0 16px #9ba4b2;
    border: 1px solid #58BB73;
  }

  .searchInput input.ivu-input {
    border-top: transparent !important;
    border-left: transparent !important;
    border-right: transparent !important;
  }

  .emoji-icon {
    padding: 0 2px;
    font-size: 24px;
    cursor: pointer;
    border-radius: 4px;
    display: inline-flex;
    width: 25%;
    justify-content: center;
  }

  .emoji-icon.fav {
    background-color: rgba(155, 164, 178, 0.16);
    border: 1px dashed rgba(155, 164, 178, 0.48);
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
