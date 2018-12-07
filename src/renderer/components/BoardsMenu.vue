<template>

  <simplebar class="board-menu-container">
    <boards-actions-row></boards-actions-row>
    <boards-title-row></boards-title-row>
    <draggable :list="boards"
               :options="{handle: '.board-row-container'}"
               @change="boardsRearranged"
               @start="draggingStarted"
               @end="draggingEnded"
    >
      <transition-group name="board-list-transition">
        <board-row v-for="board in boards"
                   :isDragging="isDragging"
                   :boardId="board.id"
                   :label="board.label"
                   :progress="board.progress"
                   :key="board.id">
        </board-row>
      </transition-group>
    </draggable>
  </simplebar>
</template>

<script>
  import draggable from 'vuedraggable'
  import simplebar from 'simplebar-vue'
  import 'simplebar/dist/simplebar.min.css'

  import BoardRow from './BoardRow'
  import BoardsTitleRow from './BoardsTitleRow'
  import BoardsActionsRow from './BoardsActionsRow'

  export default {
    name: 'BoardsMenu',
    components: {BoardsActionsRow, BoardsTitleRow, BoardRow, draggable, simplebar},
    data () {
      return {
        localBoards: [],
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
    },
    created () {
      this.localBoards = JSON.parse(JSON.stringify(this.$store.state.boards.boardsList))
    }
  }
</script>

<style scoped>
  .board-menu-container {
    background: linear-gradient(to top, #1a1b20 0%, #2d3039 100%);
    height: calc(100vh - 32px);
    width: 20%;
    padding: 16px;
    min-width: 250px;
    color: #A1A1A1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .add-board-btn {
    cursor: pointer;
    float: right;
  }

  .boards-title-row {
    color: #fff;
    font-weight: bold;
    margin: 16px 0;
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
