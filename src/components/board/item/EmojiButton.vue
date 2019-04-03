<template>
  <div class="emoji-btn">
    <Tooltip content="Emoji" placement="right" :delay="1000">
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
  export default {
    name: 'EmojiButton',
    methods: {
      toggleEmoji() {
        this.$emit('toggleEmoji')
      }
    }
  };
</script>

<style>
  .emoji-btn {
    position: absolute;
    top: 90px;
    right: 102px;
    z-index: 100;
  }

  .emoji-btn button i {
    margin-top: 1px;
  }

</style>
