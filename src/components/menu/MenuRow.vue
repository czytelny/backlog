<template>
  <div class="board-row-container">
    <router-link :to="'/board/'+boardId">
      <div class="board-row"
           :data-id="boardId"
           :class="{'isDragging': isDragging}"
           @dblclick="showRenameModal"
           @click="saveActiveBoard">
        <MenuMoreBtn :boardId="boardId" :label="label"/>

        <span>
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
  import MenuMoreBtn from "./MenuMoreBtn";

  export default {
    name: "MenuRow",
    components: {MenuMoreBtn},
    props: ["boardId", "label", "progress", "isDragging", "showProgress"],
    computed: {
      activeBoard: {
        set(value) {
          this.$store.dispatch("setActiveBoard", value);
        },
        get() {
          return this.$store.state.boards.activeBoard;
        }
      }
    },
    methods: {
      saveActiveBoard() {
        this.activeBoard = this.boardId;
      },
      showRenameModal() {
        this.$store.dispatch("showRenameBoardModal", {
          currentBoardName: this.label,
          boardId: this.boardId
        });
      }
    }
  };
</script>

<style scoped>
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
    user-select: none;
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    margin: 10px 0;
    line-height: 1em;
    position: relative;
  }

  .board-row:hover {
    padding: 0 4px;
  }

  .board-row.draggingItem {
    color: #15f953;
    cursor: pointer;
    text-shadow: 0 0 8px #000;
  }

  .board-row:hover .progress {
    opacity: 1;
  }

  .board-row:hover .icon-more {
    opacity: 1;
  }

  a {
    color: #d3d3d3;
  }

  a.router-link-active {
    font-weight: bold;
    color: #58BB73;
  }
  a.router-link-active .board-row {
    padding-left: 4px;
  }

  a.router-link-active .progress {
    opacity: 1;
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
