<template>
    <div class="tab-content">
        {{id}}
    </div>
</template>

<script>
  export default {
    name: 'board',
    props: ['id']
  }
</script>

<style>
    .tab-content{
        padding: 0 20px;
    }
</style>
