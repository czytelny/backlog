import boardsRepository from './../../repositories/boardsRepository';
import itemsRepository from '@/repositories/itemsRepository';
import settingsRepository from '@/repositories/settingsRepository';

const state = {
  activeBoard: {},
  rawBoards: [],
  boardsList: [],
  boardItems: [],
  isSubmittingNewItem: false,
  findItem: {
    itemText: ''
  }
};

const mutations = {
  SET_BOARDS (state, boardsArray) {
    state.boardsList = boardsArray;
  },
  SET_RAW_BOARDS (state, boards) {
    state.rawBoards = boards;
  },
  SET_BOARD_ITEMS (state, items) {
    state.boardItems = items;
  },
  SET_ACTIVE_BOARD (state, board) {
    const activeBoard = state.boardsList.find((b) => b.id === board.id);
    state.activeBoard = activeBoard;
  },
  SWITCH_SHOW_DONE (state, {showDone}) {
    state.activeBoard.showDone = showDone;
  },
  SWITCH_SHOW_PROGRESS (state, val) {
    state.activeBoard.showProgress = val;
  },
  SWITCH_PREPEND_NEW_ITEM (state, {prependNewItem}) {
    state.activeBoard.prependNewItem = prependNewItem;
  },
  SET_IS_SUBMITTING_NEW_ITEM (state, val) {
    state.isSubmittingNewItem = val;
  },
  SET_FIND_ITEM_TEXT (state, val) {
    state.findItem.itemText = val;
  }
};

const actions = {
  fetchBoards ({commit}) {
    commit('SET_BOARDS', boardsRepository.getList());
  },
  fetchRawBoards ({commit}) {
    commit('SET_RAW_BOARDS', boardsRepository.getRawBoards());
  },
  fetchBoardItems ({commit}, boardId) {
    commit('SET_BOARD_ITEMS', boardsRepository.getBoardItems(boardId));
  },
  fetchActiveBoard ({commit}) {
    const board = boardsRepository.getBoardById(boardsRepository.getActiveBoard());
    commit('SET_ACTIVE_BOARD', board);
  },
  setActiveBoard ({commit}, boardId) {
    boardsRepository.setActiveBoard(boardId);
    const board = boardsRepository.getBoardById(boardId);
    commit('SET_ACTIVE_BOARD', board);
  },
  setFirstBoardAsActiveBoard ({commit}) {
    const activeBoard = boardsRepository.getFirstBoard();
    boardsRepository.setActiveBoard(activeBoard.id);
    commit('SET_ACTIVE_BOARD', activeBoard);
    return activeBoard.id;
  },
  saveNewBoard ({commit, rootState}, boardName) {
    const savedBoard = boardsRepository.saveNewBoard(boardName, rootState.settings);
    actions.fetchBoards({commit});
    commit('SET_ACTIVE_BOARD', savedBoard);
    return savedBoard.id;
  },
  renameBoard ({commit, rootState}, {boardId, newName}) {
    boardsRepository.renameBoard(boardId, newName);
  },
  changeBoardsOrder ({commit}, moved) {
    boardsRepository.changeBoardsOrder(moved);
  },
  itemsOrderChanged ({commit}, {moved, boardId}) {
    boardsRepository.changeItemsOrder(boardId, moved);
  },
  switchShowDone ({commit}, {boardId, showDone}) {
    boardsRepository.switchShowDone(boardId, showDone);
    commit('SWITCH_SHOW_DONE', {boardId, showDone});
  },
  switchPrependNewItem ({commit}, {boardId, prependNewItem}) {
    itemsRepository.switchPrependNewItem(boardId, prependNewItem);
    commit('SWITCH_PREPEND_NEW_ITEM', {boardId, prependNewItem});
  },
  switchShowProgress ({commit}, {boardId, val}) {
    itemsRepository.switchShowProgress(boardId, val);
    commit('SWITCH_SHOW_PROGRESS', val);
  },
  setIsSubmittingNewItem ({commit}, val) {
    commit('SET_IS_SUBMITTING_NEW_ITEM', val);
  },
  addItem ({commit, state}, {boardId, newItem}) {
    const activeBoard = state.boardsList.find((board) => board.id === boardId);
    if (activeBoard.prependNewItem === true) {
      return boardsRepository.addItemToBegin(boardId, newItem);
    } else {
      return boardsRepository.addItemToEnd(boardId, newItem);
    }
  },
  moveItemToBottom ({commit}, {boardId, itemId}) {
    boardsRepository.moveItemToBottom(boardId, itemId);
  },
  moveItemToTop ({commit}, {boardId, itemId}) {
    boardsRepository.moveItemToTop(boardId, itemId);
  },
  removeItem ({commit}, {boardId, itemId}) {
    itemsRepository.removeItem(boardId, itemId);
    actions.fetchBoards({commit});
  },
  removeBoard ({commit}, boardId) {
    boardsRepository.removeBoard(boardId);
  },
  changeIsDone ({commit}, {boardId, itemId, newVal}) {
    itemsRepository.switchIsDone(boardId, itemId, newVal);
  },
  changeItemVal ({commit}, {boardId, itemId, newVal}) {
    itemsRepository.changeItemValue(boardId, itemId, newVal);
  },
  changeFindItem ({commit}, val) {
    commit('SET_FIND_ITEM_TEXT', val);
  },
  importOldEntries ({commit, rootState}) {
    if (!rootState.settings.wasImported) {
      boardsRepository.importOldEntries();
      settingsRepository.updateAppSettings({'wasImported': true});
    }
  },
  moveItemToBoard ({commit}, {srcBoardId, dstBoardId, itemId}) {
    boardsRepository.moveItemToBoard(srcBoardId, dstBoardId, itemId);
    actions.fetchBoards({commit});
  }
};

export default {
  state,
  mutations,
  actions
};
