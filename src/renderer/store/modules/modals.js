const state = {
  newBoard: false,
  settings: false
}

const mutations = {
  SHOW_NEW_BOARD (state) {
    state.newBoard = true
  },
  HIDE_NEW_BOARD (state) {
    state.newBoard = false
  }

}

const actions = {
  showNewBoardModal ({commit}) {
    commit('SHOW_NEW_BOARD')
  },
  hideNewBoardModal ({commit}) {
    commit('HIDE_NEW_BOARD')
  }
}

export default {
  state,
  mutations,
  actions
}
