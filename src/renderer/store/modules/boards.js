import boardsRepository from '@/repositories/boardsRepository'

const state = {
  boardsList: [],
  selectedTab: 'default'
}

const mutations = {
  SET_BOARDS (state, boardsArray) {
    state.boardsList = boardsArray
  }
}

const actions = {
  FETCH_BOARDS ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList())
  }
}

export default {
  state,
  mutations,
  actions
}
