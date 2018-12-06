<template>
  <div>
    <router-link :to="'/board/'+boardId">
      <div class="board-row"
           :class="{'active': isBoardActive}"
           @click="saveActiveBoard">
        <span class="board-label-row">{{label}}</span>
        <span class="progress">{{progress}}%</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'BoardRow',
    props: ['boardId', 'label', 'progress'],
    computed: {
      isBoardActive () {
        return this.$store.state.boards.activeBoard === this.boardId
      },
      activeBoard: {
        set (value) {
          this.$store.dispatch('setActiveBoard', value)
        },
        get () {
          return this.$store.state.boards.activeBoard
        }
      }
    },
    methods: {
      saveActiveBoard () {
        this.activeBoard = this.boardId
      }
    }
  }
</script>

<style scoped lang="scss">
  a {
    color: inherit;
    transition: inherit;
  }

  a:hover {
    color: inherit;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    -ms-transition: inherit;
    -o-transition: inherit;
    transition: inherit;
  }

  .board-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 4px 8px;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .board-row:hover {
    color: #fff;
    text-shadow: 0 0 5px #D2DBDE;

    .progress {
      opacity: 1;
    }
  }

  .board-label-row {
  }

  .active {
    color: #fff;
    text-shadow: 0 0 5px #D2DBDE;
  }

  .progress {
    opacity: .25;
  }
</style>
