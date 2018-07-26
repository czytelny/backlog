import boardsRepository from '@/repositories/boardsRepository'

const remote = require('electron').remote
const version = remote.app.getVersion()

const state = {
  newBoard: false,
  settings: {
    isVisible: false,
    currentVersion: version,
    boardsList: [],
    restartRequired: false,
    restartReqCloak: false,
    restartCountdown: 3
  },
  moveToBoard: {
    isVisible: false,
    movingItemId: null
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
  SHOW_MOVE_TO_BOARD (state) {
    state.moveToBoard.isVisible = true
  },
  HIDE_MOVE_TO_BOARD (state) {
    state.moveToBoard.isVisible = false
  },
  SET_SETTINGS_BOARDS_LIST (state, boards) {
    state.settings.boardsList = boards
  },
  SET_SETTINGS_RESTART_REQUIRED (state, val) {
    state.settings.restartRequired = val
  },
  SET_RESTART_REQ_CLOAK (state, val) {
    state.settings.restartReqCloak = val
  },
  DECREASE_RESTART_REQ_CLOAK (state) {
    state.settings.restartCountdown -= 1
  },
  SET_MOVING_ITEM_ID (state, movingItemId) {
    state.moveToBoard.movingItemId = movingItemId
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
  showMoveToBoard ({commit}, movingItemId) {
    commit('SET_MOVING_ITEM_ID', movingItemId)
    commit('SHOW_MOVE_TO_BOARD')
  },
  hideMoveToBoardModal ({commit}) {
    commit('HIDE_MOVE_TO_BOARD')
  },
  fetchSettingsBoardsList ({commit}) {
    commit('SET_SETTINGS_BOARDS_LIST', boardsRepository.getList())
  },
  setRestartRequired ({commit}) {
    commit('SET_SETTINGS_RESTART_REQUIRED', true)
  },
  showRestartReqCloak ({commit}) {
    commit('SET_RESTART_REQ_CLOAK', true)
  },
  decreaseRestartCountdown ({commit}) {
    commit('DECREASE_RESTART_REQ_CLOAK')
  }
}

export default {
  state,
  mutations,
  actions
}
