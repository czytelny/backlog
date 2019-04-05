<template>
  <div class="emoji-btn">
    <Tooltip :content="showEmojiShortcutString" placement="right" :delay="1000">
      <Button shape="circle"
              size="small"
              icon="md-happy"
              @click="toggleEmoji"
      >
      </Button>
    </Tooltip>
  </div>
</template>

<script>
  import keyShortcutMixin from './../../../keyShortcutStringMixin';

  export default {
    name: 'EmojiButton',
    mixins: [keyShortcutMixin],
    computed: {
      showEmojiShortcutString () {
        return `Emoji - ${this.shortcutString('showEmoji')}`;
      },
    },
    methods: {
      toggleEmoji () {
        this.$emit('toggleEmoji');
      }
    }
  };
</script>

<style>
  .emoji-btn {
    position: absolute;
    top: 53px;
    right: 102px;
    z-index: 100;
  }

  .emoji-btn button i {
    margin-top: 1px;
  }

</style>
