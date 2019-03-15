<template>
  <div class="creationDate">
    <Tooltip placement="left" :transfer="true">
      <Icon type="ios-calendar-outline"/>
      <div slot="content">
        <p>{{created | simpleDate}}</p>
        <p>Created {{daysFrom(created)}} days ago.</p>
      </div>
    </Tooltip>
  </div>
</template>

<script>
  export default {
    name: 'BoardItemCalendar',
    props: ['created'],
    methods: {
      daysFrom (firstDate) {
        if (!firstDate) {
          return
        }
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        const today = new Date()
        const then = new Date(firstDate)
        return `${Math.round(Math.abs((then.getTime() - today.getTime()) / (oneDay)))}`
      }
    },
    filters: {
      simpleDate (dateString) {
        if (!dateString) {
          return
        }
        const date = new Date(dateString)
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
                ${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`
      }
    }
  }
</script>

<style scoped>
  .creationDate {
    position: absolute;
    font-size: 1em;
    color: #979797;
    right: 32px;
    top: 10px;
    opacity: .8;
    cursor: pointer;
  }
</style>
