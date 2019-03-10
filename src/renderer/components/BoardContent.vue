<template>
  <div class="board-content-container">
    <div class="new-item-input">
      <NewItemInput @itemAdded="scrollToNewItem"/>
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

    <StatusBar :board-items="boardItems" v-if="!isBoardItemsEmpty"></StatusBar>

    <div class="items-container" v-if="!isBoardItemsEmpty">
      <draggable :value="boardItems"
                 handle=".drag"
                 @change="boardItemsRearanged"
      >
        <transition-group name="list-complete">
          <board-item v-for="item in boardItems"
                      :key="item.id"
                      :itemId="item.id"
                      :isDone="item.isDone"
                      :text="item.text"
                      :created="item.created"
                      :ref="item.id"
                      :boardId="boardId"
          >
          </board-item>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import BoardItem from '@/components/board/item/BoardItem.vue'
  import StatusBar from '@/components/board/StatusBar'
  import NewItemInput from '@/components/board/NewItemInput'
  import simplebar from 'simplebar-vue'
  import 'simplebar/dist/simplebar.min.css'
  import VueScrollTo from 'vue-scrollto'
  import draggable from 'vuedraggable'

  export default {
    name: 'BoardContent',
    components: {
      BoardItem,
      StatusBar,
      NewItemInput,
      simplebar,
      draggable
    },
    created () {
      this.$store.dispatch('fetchBoardItems', this.boardId)
    },
    beforeRouteUpdate (to, from, next) {
      this.$store.dispatch('fetchBoardItems', to.params.boardId)
      next()
    },
    computed: {
      boardId () {
        return this.$route.params.boardId
      },
      boardItems () {
        return this.$store.state.boards.boardItems
      },
      isBoardItemsEmpty () {
        return !this.boardItems.length
      },
      isAllItemsDone () {
        return this.boardItems.length && !this.boardItems.find(item => !item.isDone)
      },
      filterString () {
        return this.$store.state.boards.findItem.itemText.toLowerCase()
      },
      filteredBoardItems () {
        return this.boardItems.filter((item) => item.text.toLowerCase().includes(this.filterString))
      },
      isFiltered () {
        return this.$store.state.boards.findItem.itemText.length > 0
      }
    },
    methods: {
      scrollToNewItem (element) {
        if (this.$refs[element.id]) {
          const el = this.$refs[element.id]

          var options = {
            container: '.items-container',
            easing: 'ease-in',
            offset: -60,
            force: true,
            cancelable: true,
            x: false,
            y: true
          }
          VueScrollTo.scrollTo(el[0].$el, 500, options)
          el[0].$el.classList.add('newlyAddedItem')
          setTimeout(() => {
            el[0].$el.classList.remove('newlyAddedItem')
          }, 2000)
        }
      },
      boardItemsRearanged ({moved}) {
        this.$store.dispatch('itemsOrderChanged', {boardId: this.boardId, moved})
        this.$store.dispatch('fetchBoardItems', this.boardId)
      }
    }
  }
</script>

<style scoped>
  .board-content-container {
    background-color: #FAFCFF;
    padding: 16px;
    width: calc(80% - 80px);
    max-width: 960px;
    border-right: 1px solid #cecece;
    box-shadow: 16px 0 64px rgba(57, 59, 62, 0.13);
  }

  .info {
    text-align: center;
    font-size: 1.5em;
    opacity: .25;
    padding: 20px 0;
  }

  .new-item-input {
    background-color: #fff;
    padding: 15px;
    width: 100%;
    margin-top: -16px;
    margin-bottom: 16px;
    box-shadow: 0 0 5px #e2e2e2;
  }

  .items-container {
    overflow-y: auto;
    height: calc(100vh - 150px);
    /*box-shadow: inset 0px -32px 20px -18px rgb(146, 143, 143)*/
    /*box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset*/
  }

  .sortable-ghost {
    background-color: rgba(59, 59, 59, 0.31);
    border-top: 1px solid #3b3b3b;
    border-bottom: 1px solid #3b3b3b;
    border-radius: 4px;
    opacity: 0.5;
  }

</style>
