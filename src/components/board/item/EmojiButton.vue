<template>
  <div>
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


</style>
