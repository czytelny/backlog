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
  },
  SHOW_SETTINGS (state) {
    state.settings = true
  },
  HIDE_SETTINGS (state) {
    state.settings = false
  }
}

const actions = {
  showNewBoardModal ({commit}) {
    commit('SHOW_NEW_BOARD')
  },
  hideNewBoardModal ({commit}) {
    commit('HIDE_NEW_BOARD')
  },
  showSettingsModal ({commit}) {
    commit('SHOW_SETTINGS')
  },
  hideSettingsModal ({commit}) {
    commit('HIDE_SETTINGS')
  }
}

export default {
  state,
  mutations,
  actions
}
