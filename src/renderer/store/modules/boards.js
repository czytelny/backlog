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
  FETCH_BOARDS ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList())
  },
  FETCH_ACTIVE_BOARD ({commit}) {
    commit('SET_ACTIVE_BOARD', boardsRepository.getActiveBoard())
  },
  SET_ACTIVE_BOARD ({commit}, boardId) {
    boardsRepository.setActiveBoard(boardId)
    commit('SET_ACTIVE_BOARD', boardId)
  }
}

export default {
  state,
  mutations,
  actions
}
