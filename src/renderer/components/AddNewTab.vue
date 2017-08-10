<template>
  <div class="tab-content">
    <Form inline>
      <Form-item prop="user">
        <Input v-model="newNameValue" placeholder="New board name" style="width: 300px"></Input>
      </Form-item>
      <Form-item prop="user">
        <Button type="primary" @click="submitNewTab()">OK</Button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'add-new-tab',
    data () {
      return {
        newNameValue: null
      }
    },
    methods: {
      submitNewTab () {
        this.$emit('submitNewTab', this.newNameValue)
        this.newNameValue = null
      }
    }
  }
</script>

<style>

</style>
