import boardsRepository from "./../../repositories/boardsRepository";

const remote = require("electron").remote;
const version = remote.app.getVersion();

const state = {
  cloud: {
    isConnecting: false,
    isVisible: false,
  },
  duplicateBoard: {
    isVisible: false,
    name: "",
    boardId: null,
  },
  findItem: {
    isVisible: false,
    findingItem: "",
  },
  keymap: {
    system: "",
    isVisible: false,
    isCapturing: false,
  },
  newBoard: {
    isVisible: false,
    name: "",
  },
  renameBoard: {
    isVisible: false,
    name: "",
    boardId: null,
  },
  settings: {
    isVisible: false,
    currentVersion: version,
  },
  update: {
    isVisible: false,
  },
  language: {
    isVisible: false,
  },
};

const mutations = {
  HIDE_CLOUD(state) {
    state.cloud.isVisible = false;
  },
  HIDE_DUPLICATE_BOARD(state) {
    state.duplicateBoard.isVisible = false;
  },
  HIDE_FIND_ITEM_MODAL(state) {
    state.findItem.isVisible = false;
  },
  HIDE_KEYMAP_MODAL(state) {
    state.keymap.isVisible = false;
  },
  HIDE_NEW_BOARD(state) {
    state.newBoard.isVisible = false;
  },
  HIDE_LANG_BOARD(state) {
    state.language.isVisible = false;
  },
  HIDE_RENAME_BOARD(state) {
    state.renameBoard.isVisible = false;
  },
  HIDE_SETTINGS(state) {
    state.settings.isVisible = false;
  },
  HIDE_UPDATE_MODAL(state) {
    state.update.isVisible = false;
  },
  SET_DUPLICATE_BOARD_NAME(state, val) {
    state.duplicateBoard.name = val;
  },
  SET_IS_CAPTURING(state, val) {
    state.keymap.isCapturing = val;
  },
  SET_NEW_BOARD_NAME(state, name) {
    state.newBoard.name = name;
  },
  SET_RENAMED_BOARD_NAME(state, name) {
    state.renameBoard.name = name;
  },
  SET_SYSTEM(state, val) {
    state.keymap.system = val;
  },
  SET_IS_CONNECTING(state, val) {
    state.cloud.isConnecting = val;
  },
  SHOW_CLOUD(state) {
    state.cloud.isVisible = true;
  },
  SHOW_DUPLICATE_BOARD(state, {boardId, currentBoardName}) {
    state.duplicateBoard.boardId = boardId;
    state.duplicateBoard.name = currentBoardName + " copy";
    state.duplicateBoard.isVisible = true;
  },
  SHOW_FIND_ITEM_MODAL(state) {
    state.findItem.isVisible = true;
  },
  SHOW_KEYMAP_MODAL(state) {
    state.keymap.isVisible = true;
  },
  SHOW_NEW_BOARD(state) {
    state.newBoard.isVisible = true;
  },
  SHOW_RENAME_BOARD(state, {currentBoardName, boardId}) {
    state.renameBoard.isVisible = true;
    state.renameBoard.name = currentBoardName;
    state.renameBoard.boardId = boardId;
  },
  SHOW_SETTINGS(state) {
    state.settings.isVisible = true;
  },
  SHOW_UPDATE_MODAL(state) {
    state.update.isVisible = true;
  },
  SHOW_LANGUAGE_MODAL(state) {
    state.language.isVisible = true;
  },
};

const actions = {
  duplicateBoard(context, {newName, boardId}) {
    boardsRepository.duplicateBoard(boardId, newName);
  },
  hideCloudModal({commit}) {
    commit("HIDE_CLOUD");
  },
  hideDuplicateBoard({commit}) {
    commit("HIDE_DUPLICATE_BOARD");
  },
  hideFindItemModal({commit}) {
    commit("HIDE_FIND_ITEM_MODAL");
  },
  hideKeymapModal({commit}) {
    commit("HIDE_KEYMAP_MODAL");
  },
  hideNewBoardModal({commit}) {
    commit("HIDE_NEW_BOARD");
  },
  hideLanguageModal({commit}) {
    commit("HIDE_LANG_BOARD");
  },
  hideRenameBoardModal({commit}) {
    commit("HIDE_RENAME_BOARD");
  },
  hideSettingsModal({commit}) {
    commit("HIDE_SETTINGS");
  },
  hideUpdateModal({commit}) {
    commit("HIDE_UPDATE_MODAL");
  },
  resetNewBoardName({commit}) {
    commit("SET_NEW_BOARD_NAME", "");
  },
  setDuplicatedBoardName({commit}, val) {
    commit("SET_DUPLICATE_BOARD_NAME", val);
  },
  setIsCapturing({commit}, val) {
    commit("SET_IS_CAPTURING", val);
  },
  setNewBoardName({commit}, val) {
    commit("SET_NEW_BOARD_NAME", val);
  },
  setRenamedBoardName({commit}, val) {
    commit("SET_RENAMED_BOARD_NAME", val);
  },
  setSystem({commit}, val) {
    commit("SET_SYSTEM", val);
  },
  setIsConnecting({commit}, val) {
    commit("SET_IS_CONNECTING", val);
  },
  showCloudModal({commit}) {
    commit("SHOW_CLOUD");
  },
  showDuplicateBoard({commit}, {boardId, currentBoardName}) {
    commit("SHOW_DUPLICATE_BOARD", {boardId, currentBoardName});
  },
  showFindItemModal({commit}) {
    commit("SHOW_FIND_ITEM_MODAL");
  },
  showKeymapModal({commit}) {
    commit("SHOW_KEYMAP_MODAL");
  },
  showNewBoardModal({commit}) {
    commit("SHOW_NEW_BOARD");
  },
  showRenameBoardModal({commit}, {currentBoardName, boardId}) {
    commit("SHOW_RENAME_BOARD", {currentBoardName, boardId});
  },
  showSettingsModal({commit}) {
    commit("SHOW_SETTINGS");
  },
  showLanguageModal({commit}) {
    commit("SHOW_LANGUAGE_MODAL");
  },
  showUpdateModal({commit}) {
    commit("SHOW_UPDATE_MODAL");
  },
};

export default {
  state,
  mutations,
  actions,
};
