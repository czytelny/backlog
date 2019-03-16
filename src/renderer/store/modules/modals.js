import boardsRepository from '@/repositories/boardsRepository'

const remote = require('electron').remote
const version = remote.app.getVersion()

const state = {
  newBoard: {
    isVisible: false,
    name: ''
  },
  findItem: {
    isVisible: false,
    findingItem: ''
  },
  renameBoard: {
    isVisible: false,
    name: '',
    boardId: null
  },
  settings: {
    isVisible: false,
    currentVersion: version,
    boardsList: []
  },
  moveToBoard: {
    isVisible: false,
    movingItemText: null,
    movingItemId: null
  },
  update: {
    isVisible: false
  },
  keymap: {
    isVisible: false,
    isCapturing: false
  }
}

const mutations = {
  SHOW_NEW_BOARD (state) {
    state.newBoard.isVisible = true
  },
  HIDE_NEW_BOARD (state) {
    state.newBoard.isVisible = false
  },
  SHOW_RENAME_BOARD (state, {currentBoardName, boardId}) {
    state.renameBoard.isVisible = true
    state.renameBoard.name = currentBoardName
    state.renameBoard.boardId = boardId
  },
  HIDE_RENAME_BOARD (state) {
    state.renameBoard.isVisible = false
  },
  SET_NEW_BOARD_NAME (state, name) {
    state.newBoard.name = name
  },
  SET_RENAMED_BOARD_NAME (state, name) {
    state.renameBoard.name = name
  },
  SHOW_SETTINGS (state) {
    state.settings.isVisible = true
  },
  HIDE_SETTINGS (state) {
    state.settings.isVisible = false
  },
  HIDE_FIND_ITEM_MODAL (state) {
    state.findItem.isVisible = false
  },
  SHOW_FIND_ITEM_MODAL (state) {
    state.findItem.isVisible = true
  },
  SHOW_MOVE_TO_BOARD (state) {
    state.moveToBoard.isVisible = true
  },
  HIDE_MOVE_TO_BOARD (state) {
    state.moveToBoard.isVisible = false
  },
  SHOW_KEYMAP_MODAL (state) {
    state.keymap.isVisible = true
  },
  HIDE_KEYMAP_MODAL (state) {
    state.keymap.isVisible = false
  },
  SHOW_UPDATE_MODAL (state) {
    state.update.isVisible = true
  },
  HIDE_UPDATE_MODAL (state) {
    state.update.isVisible = false
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
  SET_MOVING_ITEM_ID (state, movingItemId) {
    state.moveToBoard.movingItemId = movingItemId
  },
  SET_MOVING_ITEM_TEXT (state, movingItemText) {
    state.moveToBoard.movingItemText = movingItemText
  },
  SET_IS_CAPTURING (state, val) {
    state.keymap.isCapturing = val
  }
}

const actions = {
  showNewBoardModal ({commit}) {
    commit('SHOW_NEW_BOARD')
  },
  hideNewBoardModal ({commit}) {
    commit('HIDE_NEW_BOARD')
  },
  showRenameBoardModal ({commit}, {currentBoardName, boardId}) {
    commit('SHOW_RENAME_BOARD', {currentBoardName, boardId})
  },
  hideRenameBoardModal ({commit}) {
    commit('HIDE_RENAME_BOARD')
  },
  showSettingsModal ({commit}) {
    commit('SHOW_SETTINGS')
  },
  hideSettingsModal ({commit}) {
    commit('HIDE_SETTINGS')
  },
  showMoveToBoard ({commit}, {itemId, itemText}) {
    commit('SET_MOVING_ITEM_ID', itemId)
    commit('SET_MOVING_ITEM_TEXT', itemText)
    commit('SHOW_MOVE_TO_BOARD')
  },
  hideMoveToBoardModal ({commit}) {
    commit('HIDE_MOVE_TO_BOARD')
  },
  showUpdateModal ({commit}) {
    commit('SHOW_UPDATE_MODAL')
  },
  hideUpdateModal ({commit}) {
    commit('HIDE_UPDATE_MODAL')
  },
  showKeymapModal ({commit}) {
    commit('SHOW_KEYMAP_MODAL')
  },
  hideKeymapModal ({commit}) {
    commit('HIDE_KEYMAP_MODAL')
  },
  hideFindItemModal ({commit}) {
    commit('HIDE_FIND_ITEM_MODAL')
  },
  showFindItemModal ({commit}) {
    commit('SHOW_FIND_ITEM_MODAL')
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
  setNewBoardName ({commit}, val) {
    commit('SET_NEW_BOARD_NAME', val)
  },
  resetNewBoardName ({commit}) {
    commit('SET_NEW_BOARD_NAME', '')
  },
  setRenamedBoardName ({commit}, val) {
    commit('SET_RENAMED_BOARD_NAME', val)
  },
  setIsCapturing ({commit}, val) {
    commit('SET_IS_CAPTURING', val)
  }
}

export default {
  state,
  mutations,
  actions
}
