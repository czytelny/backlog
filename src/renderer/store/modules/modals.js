import boardsRepository from '@/repositories/boardsRepository'

const remote = require('electron').remote
const version = remote.app.getVersion()

const state = {
  newBoard: false,
  settings: {
    isVisible: false,
    currentVersion: version,
    boardsList: [],
    restartRequired: false
  }
}

const mutations = {
  SHOW_NEW_BOARD (state) {
    state.newBoard = true
  },
  HIDE_NEW_BOARD (state) {
    state.newBoard = false
  },
  SHOW_SETTINGS (state) {
    state.settings.isVisible = true
  },
  HIDE_SETTINGS (state) {
    state.settings.isVisible = false
  },
  SET_SETTINGS_BOARDS_LIST (state, boards) {
    state.settings.boardsList = boards
  },
  SET_SETTINGS_RESTART_REQUIRED (state, val) {
    state.settings.restartRequired = val
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
  },
  fetchSettingsBoardsList ({commit}) {
    commit('SET_SETTINGS_BOARDS_LIST', boardsRepository.getList())
  },
  setRestartRequired ({commit}) {
    commit('SET_SETTINGS_RESTART_REQUIRED', true)
  }
}

export default {
  state,
  mutations,
  actions
}
