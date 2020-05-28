<template>
  <div class="menu-container">
    <simplebar class="board-menu">
      <boards-title-row></boards-title-row>
      <draggable :list="boards"
                 handle=".board-row-container"
                 @change="boardsRearranged"
                 @start="draggingStarted"
                 @end="draggingEnded"
      >
        <transition-group name="board-list-transition">
          <menu-row v-for="(board, $index) in boards"
                    :data-index="$index"
                    :isDragging="isDragging"
                    :boardId="board.id"
                    :label="board.label"
                    :progress="board.progress"
                    :showProgress="board.showProgress"
                    :key="board.id">
          </menu-row>
        </transition-group>
      </draggable>
    </simplebar>
    <boards-actions-row></boards-actions-row>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';

  import MenuRow from './MenuRow';
  import BoardsTitleRow from './MenuTitleRow';
  import BoardsActionsRow from './MenuActionsRow';

  export default {
    name: 'Menu',
    components: {BoardsActionsRow, BoardsTitleRow, MenuRow, draggable, simplebar},
    data () {
      return {
        isDragging: false
      };
    },
    created () {
      let draggedItemId;
      let sourceBoardId;
      document.addEventListener('dragstart', () => {
        draggedItemId = event.target.dataset.id;
        sourceBoardId = event.target.dataset.boardid;
      });

      document.addEventListener('drop', (event) => {
        const boardRowEl = event.target.parentNode;
        if (boardRowEl.classList.contains('board-row')) {
          boardRowEl.classList.remove('draggingItem');
          if (draggedItemId && sourceBoardId) {
            this.$store.dispatch('moveItemToBoard', {
              srcBoardId: sourceBoardId,
              dstBoardId: boardRowEl.dataset.id,
              itemId: draggedItemId
            });
            this.$bus.$emit('finishItemEditing');
            this.$store.dispatch('fetchBoardItems', sourceBoardId);
            draggedItemId = null;
            sourceBoardId = null;
          }
        }
      }, false);

      document.addEventListener('dragenter', (event) => {
        event.preventDefault();
        const boardRowEl = event.target.parentNode;
        if (boardRowEl.className === 'board-row') {
          boardRowEl.classList.add('draggingItem');
        }
      }, false);

      document.addEventListener('dragleave', (event) => {
        event.preventDefault();
        const boardRowEl = event.target.parentNode;
        if (boardRowEl.classList.contains('board-row')) {
          boardRowEl.classList.remove('draggingItem');
        }
      }, false);
    },
    computed: {
      boards: {
        get () {
          return this.$store.state.boards.boardsList;
        }
      }
    },
    methods: {
      boardsRearranged ({moved}) {
        this.$store.dispatch('changeBoardsOrder', moved);
      },
      draggingStarted () {
        this.isDragging = true;
      },
      draggingEnded () {
        this.isDragging = false;
      }
    }
  };
</script>

<style scoped>
  .logo {
    padding: 8px;
    box-sizing: content-box;
    background-color: #878f99;
    border-radius: 12%;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    cursor: pointer;
  }

  .logo:hover {
    border-radius: 0;
    background-color: #6b717a;
  }

  .menu-container {
    /*background: rgb(55,70,83);*/
    /*background: linear-gradient(180deg, rgba(55,70,83,1) 0%, rgba(45,59,70,1) 99%);*/
    background: #435463;
    /*background: rgb(55,70,83);*/
    /*background: radial-gradient(circle, rgba(55,70,83,1) 0%, rgba(45,59,70,1) 100%);*/
    height: calc(100vh - 32px);
    width: 350px;
    min-width: 230px;
    color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
    z-index: 1;
    position: relative;
  }

  .board-menu {
    width: 100%;
    padding: 32px;
    transition: all .3s;
    box-shadow: 0 0 16px rgba(57, 59, 62, 0.11);
  }

  .add-board-btn {
    cursor: pointer;
    float: right;
  }

  .sortable-ghost {
    opacity: 0;
  }

  .board-list-transition-move {
    transition: transform .3s;
  }

</style>
