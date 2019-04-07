<template>
  <div class="board-content-container">
    <div class="board-top-actions"
         :class="{'smaller' : !isProgressVisible}">
      <NewItemInput @itemAdded="scrollToNewItem"/>
      <BoardSettings :isDisabled="isBoardItemsEmpty"
                     :boardId="boardId"/>

      <StatusBar :board-items="boardItems"
                 class="invisible"
                 :class="{'visible' : isProgressVisible}"
                 v-if="!isBoardItemsEmpty"/>
    </div>

    <div v-if="isBoardItemsEmpty" class="info">
      <h1>No items on this board yet</h1>
      <h4>Go ahead and add some!</h4>
    </div>

    <div v-if="isAllItemsDone" class="info">
      <h1>Great, all items are done!</h1>
    </div>

    <div v-if="!filteredBoardItems.length && !isBoardItemsEmpty" class="info">
      <h1>No results...</h1>
    </div>

    <div class="items-container" v-if="!isBoardItemsEmpty">
      <draggable :value="boardItems"
                 handle=".drag"
                 @change="boardItemsRearanged"
      >
        <transition-group name="list-complete">
          <board-item v-for="item in filteredBoardItems"
                      :key="item.id"
                      :itemId="item.id"
                      :isDone="item.isDone"
                      :text="item.text"
                      :created="item.created"
                      :ref="item.id"
                      :id="item.id"
                      :boardId="boardId"
                      v-if="shouldBeDisplayed(item)"
          >
          </board-item>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import BoardItem from './item/BoardItem.vue';
  import StatusBar from './StatusBar';
  import NewItemInput from './NewItemInput';
  import VueScrollTo from 'vue-scrollto';
  import draggable from 'vuedraggable';
  import BoardSettings from './boardSettingsBar/BoardSettings';

  export default {
    name: 'BoardContent',
    components: {
      BoardSettings,
      BoardItem,
      StatusBar,
      NewItemInput,
      draggable
    },
    created () {
      this.$store.dispatch('fetchBoardItems', this.boardId);
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('fetchBoardItems', to.params.boardId);
      if (to.params.itemId) {
        this.scheduleScroll(to.params.itemId);
      }
      next();
    },
    computed: {
      board () {
        return this.$store.state.boards.activeBoard;
      },
      boardId () {
        return this.$route.params.boardId;
      },
      boardItems () {
        return this.$store.state.boards.boardItems;
      },
      isBoardItemsEmpty () {
        return !this.boardItems.length;
      },
      isAllItemsDone () {
        return this.boardItems.length && !this.boardItems.find(item => !item.isDone);
      },
      filterString () {
        return this.$store.state.boards.findItem.itemText.toLowerCase();
      },
      filteredBoardItems () {
        return this.boardItems.filter((item) => item.text.toLowerCase().includes(this.filterString));
      },
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0;
      },
      isProgressVisible () {
        return this.$store.state.boards.activeBoard.showProgress;
      }
    },
    methods: {
      shouldBeDisplayed (item) {
        if (!item.isDone) {
          return true;
        }
        return this.board.showDone;
      },
      scheduleScroll (itemId) {
        setTimeout(() => {
          this.scrollToNewItem({id: itemId});
        }, 700);
      },
      scrollToNewItem (element) {
        const el = document.getElementById(element.id);
        if (el) {
          var options = {
            container: '.items-container',
            easing: 'ease-in',
            offset: -60,
            force: true,
            cancelable: true,
            x: false,
            y: true
          };
          VueScrollTo.scrollTo(el, 500, options);
          el.classList.add('newlyAddedItem');
          setTimeout(() => {
            el.classList.remove('newlyAddedItem');
          }, 2000);
        }
      },
      boardItemsRearanged ({moved}) {
        this.$store.dispatch('itemsOrderChanged', {boardId: this.boardId, moved});
        this.$store.dispatch('fetchBoardItems', this.boardId);
      }
    }
  };
</script>

<style scoped>
  .board-content-container {
    background-color: #FAFCFF;
    padding: 16px;
    width: 100%;
    border-right: 1px solid #cecece;
    box-shadow: 16px 0 64px rgba(57, 59, 62, 0.13);
  }

  .board-top-actions {
    background-color: #fff;
    padding: 32px 16px 8px 16px;
    width: 100%;
    margin-top: -16px;
    box-shadow: 0 0 8px #e2e2e2;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: all .3s;
    height: 155px;
  }

  .board-top-actions.smaller {
    height: 125px;
    transition-delay: .15s;
  }


  .info {
    text-align: center;
    font-size: 1.5em;
    opacity: .25;
    padding: 20px 0;
  }

  .items-container {
    overflow-y: auto;
    height: calc(100vh - 170px);
    /*box-shadow: inset 0px -32px 20px -18px rgb(146, 143, 143)*/
    /*box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset*/
  }

  .sortable-ghost {
    opacity: 0;
  }

  .list-complete-item {
    transition: all .3s;
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translateX(-100%);
  }

</style>
