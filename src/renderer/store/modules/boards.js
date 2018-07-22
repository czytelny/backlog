import boardsRepository from '@/repositories/boardsRepository'

const state = {
  activeBoard: 'default',
  boardsList: []
}

const mutations = {
  SET_BOARDS (state, boardsArray) {
    state.boardsList = boardsArray
  },
  SET_ACTIVE_BOARD (state, boardId) {
    state.activeBoard = boardId
  }
}

const actions = {
  fetchBoards ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList())
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
  }
}

export default {
  state,
  mutations,
  actions
}
