<template>
  <div id="wrapper">
    <Row>
      <Col span="24">
      <Tabs :value="selectedTab" type="card" closable>
        <Tab-pane v-for="board in boards"
                  :label="board.label"
                  :name="board.id"
                  :key="board.id">
          <board :id="board.id"></board>
        </Tab-pane>

        <Button type="ghost"
                @click="showNewBoardModal"
                size="small"
                slot="extra"
                :disabled="boards.length > 4">
          New Board
        </Button>
      </Tabs>
      </Col>
    </Row>
    <Modal
        v-model="newBoardModal"
        title="Add new board"
        @on-ok="submitNewTab"
        okText="Add"
        cancelText="Cancel">
      <Input v-model="newBoardName"
             ref="newBoardNameInput"
             placeholder="New board name"
             @on-keyup.enter="submitNewTab"
             v-focus
      />
    </Modal>
  </div>
</template>

<script>

  import Board from './Board.vue'
  import AddNewTab from './AddNewTab.vue'

  const shortid = require('electron').remote.require('shortid')

  export default {
    components: {
      AddNewTab,
      Board
    },
    name: 'landing-page',
    data () {
      return {
        newItem: null,
        boards: [{id: 'default', label: 'Default board'}],
        selectedTab: 'default',
        newBoardName: '',
        newBoardModal: false
      }
    },
    methods: {
      showNewBoardModal () {
        this.newBoardModal = true
      },
      submitNewTab () {
        const newTabId = shortid.generate()
        this.boards.push({id: newTabId, label: this.newBoardName})
        this.selectedTab = newTabId
        this.newBoardModal = false
        this.newBoardName = ''
        this.$Message.success('board added')
      }
    }
  }
</script>

<style>
 .ivu-tabs-bar{
   -webkit-user-select: none;
 }
</style>
