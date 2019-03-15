<template>
  <div class="board-row-container">
    <span class="remove-icon" @click="removeBoard" v-if="!isDragging">
      <Icon type="ios-close"/>
    </span>

    <router-link :to="'/board/'+boardId">
      <div class="board-row"
           :class="{'isDragging': isDragging}"
           @click="saveActiveBoard">
        <span @dblclick="showRenameModal">
          {{label}}
        </span>

        <transition name="fade" duration="300">
          <span class="progress" v-if="showProgress">
            {{progress}}%
          </span>
        </transition>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'MenuRow',
    props: ['boardId', 'label', 'progress', 'isDragging', 'showProgress'],
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
      removeBoard () {
        this.$Modal.confirm({
          title: `Removing board`,
          okText: 'Cancel',
          cancelText: 'Yes, remove it',
          content: `<p>You are going to remove board <strong>"${this.label}"</strong></p>
                    <p>All items will be deleted, are you sure ?</p>`,
          onCancel: () => {
            this.$store.dispatch('removeBoard', this.boardId)
            this.$store.dispatch('fetchBoards')
            this.$store.dispatch('setFirstBoardAsActiveBoard')
              .then((boardId) => {
                this.$router.push({path: `/board/${boardId}`})
              })
            this.$Message.info('Board removed')
          }
        })
      },
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
  }

  a:active {
    color: inherit;
  }

  .remove-icon {
    position: absolute;
    margin: -4px -24px;
    cursor: pointer;
    color: #fff4fb;
    opacity: 0;
    transition: opacity .3s;
  }

  .remove-icon:hover {
    color: #fff;
  }

  .board-row-container {
    font-size: 1.1em;
  }

  .board-row-container:hover .remove-icon {
    opacity: 1;
  }

  .board-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    margin: 12px 0;
    line-height: 1em;
  }

  .board-row:hover {
    .progress {
      opacity: 1;
    }
  }

  a {
    color: #c7c7c7;
  }

  a.router-link-active {
    font-weight: bold;
    color: #58BB73;

    .progress {
      opacity: 1;
    }
  }

  a.router-link-active:hover {
    text-shadow: none;
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
