import Vue from 'vue'
import boardsRepository from '@/repositories/boardsRepository'
import itemsRepository from '@/repositories/itemsRepository'

const state = {
  activeBoard: 'default',
  boardsList: [],
  boardItems: [],
  newItem: '',
  isSubmittingNewItem: false,
  findItem: {
    itemText: ''
  }
}

const mutations = {
  SET_BOARDS (state, boardsArray) {
    state.boardsList = boardsArray
  },
  SET_BOARD (state, board) {
    const boardIndex = state.boardsList.findIndex((b) => b.id === board.id)
    if (boardIndex >= 0) {
      Vue.set(state.boardsList, boardIndex, board)
    }
  },
  SET_BOARD_ITEMS (state, items) {
    state.boardItems = items
  },
  SET_ACTIVE_BOARD (state, boardId) {
    const activeBoard = state.boardsList.find((board) => board.id === boardId)
    state.activeBoard = activeBoard
  },
  SWITCH_SHOW_DONE (state, {boardId, showDone}) {
    const board = state.boardsList.find((board) => board.id === boardId)
    board.showDone = showDone
  },
  SWITCH_PREPEND_NEW_ITEM (state, {boardId, prependNewItem}) {
    const board = state.boardsList.find((board) => board.id === boardId)
    board.prependNewItem = prependNewItem
  },
  SET_NEW_ITEM (state, val) {
    state.newItem = val
  },
  SET_IS_SUBMITTING_NEW_ITEM (state, val) {
    state.isSubmittingNewItem = val
  },
  SET_FIND_ITEM_TEXT (state, val) {
    state.findItem.itemText = val
  }
}

const actions = {
  fetchBoards ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList())
  },
  fetchBoardItems ({commit}, boardId) {
    commit('SET_BOARD_ITEMS', boardsRepository.getBoardItems(boardId))
  },
  fetchActiveBoard ({commit}) {
    commit('SET_ACTIVE_BOARD', boardsRepository.getActiveBoard())
  },
  setActiveBoard ({commit}, boardId) {
    boardsRepository.setActiveBoard(boardId)
    commit('SET_ACTIVE_BOARD', boardId)
  },
  setFirstBoardAsActiveBoard ({commit}) {
    const activeBoard = boardsRepository.getFirstBoard().id
    boardsRepository.setActiveBoard(activeBoard)
    commit('SET_ACTIVE_BOARD', activeBoard)
    return activeBoard
  },
  saveNewBoard ({commit, rootState}, boardName) {
    const savedBoard = boardsRepository.saveNewBoard(boardName, rootState.settings)
    commit('SET_ACTIVE_BOARD', savedBoard.id)
    return savedBoard.id
  },
  renameBoard ({commit, rootState}, {boardId, newName}) {
    boardsRepository.renameBoard(boardId, newName)
  },
  saveBoardsArray ({commit}, boardsArray) {
    boardsRepository.saveBoardsArray(boardsArray)
    commit('SET_BOARDS', boardsRepository.getList())
  },
  changeBoardsOrder ({commit}, moved) {
    boardsRepository.changeBoardsOrder(moved)
  },
  moveItemToBoard ({commit}, {fromBrd, toBrd, movingItemId}) {
    boardsRepository.moveItemToBoard(fromBrd, toBrd, movingItemId)
  },
  switchShowDone ({commit}, {boardId, showDone}) {
    boardsRepository.switchShowDone(boardId, showDone)
    commit('SWITCH_SHOW_DONE', {boardId, showDone})
  },
  switchPrependNewItem ({commit}, {boardId, prependNewItem}) {
    itemsRepository.switchPrependNewItem(boardId, prependNewItem)
    commit('SWITCH_PREPEND_NEW_ITEM', {boardId, prependNewItem})
  },
  setNewItemVal ({commit}, val) {
    commit('SET_NEW_ITEM', val)
  },
  setIsSubmittingNewItem ({commit}, val) {
    commit('SET_IS_SUBMITTING_NEW_ITEM', val)
  },
  addItem ({commit, state}, {boardId, newItem}) {
    const activeBoard = state.boardsList.find((board) => board.id === boardId)
    if (activeBoard.prependNewItem === true) {
      boardsRepository.addItemToBegin(boardId, newItem)
    } else {
      boardsRepository.addItemToEnd(boardId, newItem)
    }
  },
  moveItemToBottom ({commit}, {boardId, itemId}) {
    boardsRepository.moveItemToBottom(boardId, itemId)
  },
  moveItemToTop ({commit}, {boardId, itemId}) {
    boardsRepository.moveItemToTop(boardId, itemId)
  },
  removeItem ({commit}, {boardId, itemId}) {
    itemsRepository.removeItem(boardId, itemId)
  },
  removeBoard ({commit}, boardId) {
    boardsRepository.removeBoard(boardId)
  },
  changeIsDone ({commit}, {boardId, itemId, newVal}) {
    itemsRepository.switchIsDone(boardId, itemId, newVal)
  },
  changeItemVal ({commit}, {boardId, itemId, newVal}) {
    itemsRepository.changeItemValue(boardId, itemId, newVal)
  },
  changeFindItem ({commit}, val) {
    commit('SET_FIND_ITEM_TEXT', val)
  }

}

export default {
  state,
  mutations,
  actions
}
