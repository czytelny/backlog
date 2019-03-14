<template>
  <div class="root-container">
    <simplebar class="board-menu">
<!--
      <div style="text-align: center;">
        <Tooltip content="Settings" placement="right">
          <img src="./../logo2.svg" width="50" class="logo">
        </Tooltip>
      </div>
-->
      <boards-title-row></boards-title-row>
      <draggable :list="boards"
                 handle=".board-row-container"
                 @change="boardsRearranged"
                 @start="draggingStarted"
                 @end="draggingEnded"
      >
        <transition-group name="board-list-transition">
          <board-row v-for="(board, $index) in boards"
                     :data-index="$index"
                     :isDragging="isDragging"
                     :boardId="board.id"
                     :label="board.label"
                     :progress="board.progress"
                     :key="board.id">
          </board-row>
        </transition-group>
      </draggable>
      <boards-actions-row></boards-actions-row>

    </simplebar>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import simplebar from 'simplebar-vue'
  import 'simplebar/dist/simplebar.min.css'

  import BoardRow from './BoardRow'
  import BoardsTitleRow from './BoardsTitleRow'
  import BoardsActionsRow from './BoardsActionsRow'
  import IconSvgBase from './IconSvgBase'

  export default {
    name: 'BoardsMenu',
    components: {IconSvgBase, BoardsActionsRow, BoardsTitleRow, BoardRow, draggable, simplebar},
    data () {
      return {
        isDragging: false
      }
    },
    computed: {
      boards: {
        get () {
          return this.$store.state.boards.boardsList
        }
      }
    },
    methods: {
      boardsRearranged ({moved}) {
        this.$store.dispatch('changeBoardsOrder', moved)
      },
      draggingStarted () {
        this.isDragging = true
      },
      draggingEnded () {
        this.isDragging = false
      }
    }
  }
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

  .root-container {
    background: #626870;
    height: calc(100vh - 32px);
    width: 350px;
    color: #ededed;
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
    background-color: #4c4f61;
    border: 1px solid #4c4f61;
    border-radius: 4px;
  }

  .board-list-transition-move {
    transition: transform .3s;
  }

</style>
