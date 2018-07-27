import Vue from 'vue'
import boardsRepository from '@/repositories/boardsRepository'

const state = {
  activeBoard: 'default',
  boardsList: []
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
  SET_ACTIVE_BOARD (state, boardId) {
    state.activeBoard = boardId
  },
  SWITCH_SHOW_DONE (state, {boardId, showDone}) {
    const board = state.boardsList.find((board) => board.id === boardId)
    board.showDone = showDone
  }
}

const actions = {
  fetchBoards ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList())
  },
  fetchBoard ({commit}, boardId) {
    commit('SET_BOARD', boardsRepository.getBoardById(boardId))
  },
  fetchActiveBoard ({commit}) {
    commit('SET_ACTIVE_BOARD', boardsRepository.getActiveBoard())
  },
  setActiveBoard ({commit}, boardId) {
    boardsRepository.setActiveBoard(boardId)
    commit('SET_ACTIVE_BOARD', boardId)
  },
  saveNewBoard ({commit, rootState}, boardName) {
    const savedBoard = boardsRepository.saveNewBoard(boardName, rootState.settings)
    commit('SET_ACTIVE_BOARD', savedBoard.id)
    return savedBoard.id
  },
  saveBoardsArray ({commit}, boardsArray) {
    boardsRepository.saveBoardsArray(boardsArray)
    commit('SET_BOARDS', boardsRepository.getList())
  },
  moveItemToBoard ({commit}, {fromBrd, toBrd, movingItemId}) {
    boardsRepository.moveItemToBoard(fromBrd, toBrd, movingItemId)
  },
  switchShowDone ({commit}, {boardId, showDone}) {
    boardsRepository.switchShowDone(boardId, showDone)
    commit('SWITCH_SHOW_DONE', {boardId, showDone})
  }
}

export default {
  state,
  mutations,
  actions
}
