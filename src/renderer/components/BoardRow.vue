<template>
  <div class="board-row-container">
    <router-link :to="'/board/'+boardId">
      <div class="board-row"
           :class="{'isDragging': isDragging}"
           @click="saveActiveBoard">
        <span class="board-label-row" @dblclick="showRenameModal">
          {{label}}
        </span>

        <span class="progress">{{progress}}%</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'BoardRow',
    props: ['boardId', 'label', 'progress', 'isDragging'],
    computed: {
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
      },
      showRenameModal () {
        this.$store.dispatch('showRenameBoardModal', {
          currentBoardName: this.label,
          boardId: this.boardId
        })
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
    color: #eaeaea;

    .progress {
      opacity: 1;
    }
  }

  a.router-link-active {
    color: #fff;
    text-shadow: 0 0 3px rgba(210, 219, 222, 0.51);
    font-weight: bold;

    .progress {
      opacity: 1;
    }
  }

  .board-row.isDragging {
    text-shadow: none;
    color: inherit;
  }

  .progress {
    opacity: .25;
  }

  .board-row-container.sortable-chosen .board-row {
    text-shadow: 0 0 5px #292929;
    color: #e7e7e7;
  }

</style>
