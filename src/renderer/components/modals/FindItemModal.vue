<template>
  <Modal :value="isVisible"
         fullscreen
         @on-visible-change="visibleChange"
  >
    <div>
      <input placeholder="Find item text..."
             class="search-input"
             v-model="searchText"
             ref="searchInput"
      />
      <div v-for="board in boards">
        <h2 class="board-name" v-if="filteredList(board.items).length">{{board.label}}</h2>
        <div v-for="item in filteredList(board.items)" class="item">
          {{item.text}}
        </div>
      </div>

    </div>

    <div slot="header" class="header">
      <Icon type="ios-locate-outline"
            size="20"/>
      Find item...
    </div>

    <div slot="footer" class="footer">
      <Button type="text" size="large" @click="closeModal">Close</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'FindItemModal',
    data () {
      return {
        searchText: ''
      }
    },
    updated () {
      this.focusOnInput()
    },
    computed: {
      isVisible () {
        return this.$store.state.modals.findItem.isVisible
      },
      boards () {
        return this.$store.state.boards.rawBoards
      }
    },
    methods: {
      focusOnInput () {
        const vm = this
        this.$nextTick(() => {
          if (vm.$refs['searchInput']) {
            vm.$refs['searchInput'].focus()
          }
        })
      },
      filteredList (boardList) {
        return boardList.filter(item => item.text.includes(this.searchText))
      },
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      closeModal () {
        this.$store.dispatch('hideFindItemModal')
        this.searchText = ''
      }
    }
  }
</script>

<style scoped>
  input.search-input {
    margin-bottom: 8px;
    width: 100%;
    font-size: 22px;
    border: 0;
    border-bottom: 1px solid #cecece;
    color: #373636;
    padding: 8px;
  }

  input.search-input:focus {
    outline: none;
    border-color: rgba(98, 104, 112, 0.43);
  }

  .board-name {
    background-color: #626870;
    color: white;
    border-radius: 4px;
    padding: 4px 8px;
    margin: 4px 0;
  }

  .item {
    margin: 0 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all .3s;
    padding-right: 8px;
    padding-left: 8px;
  }

  .header {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 0;
  }

  .header i {
    margin-bottom: 4px;
  }
</style>
