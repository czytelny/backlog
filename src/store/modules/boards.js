import boardsRepository from "./../../repositories/boardsRepository";
import itemsRepository from "./../../repositories/itemsRepository";
import EmojiIcons from "./../../assets/emojiIcons";
import syncRepository from "../../repositories/syncRepository";

const state = {
  activeBoard: {},
  addItemEmoji: {
    search: "",
    icons: EmojiIcons,
    activeIndex: 0
  },
  boardItems: [],
  boardsList: [],
  findItem: {
    itemText: ""
  },
  isSubmittingNewItem: false,
  rawBoards: []
};

const mutations = {
  SET_ACTIVE_BOARD(state, board) {
    const activeBoard = state.boardsList.find((b) => b.id === board.id);
    state.activeBoard = activeBoard;
  },
  SET_BOARD_ITEMS(state, items) {
    state.boardItems = items;
  },
  SET_BOARDS(state, boardsArray) {
    state.boardsList = boardsArray;
  },
  SET_FIND_ITEM_TEXT(state, val) {
    state.findItem.itemText = val;
  },
  SET_IS_SUBMITTING_NEW_ITEM(state, val) {
    state.isSubmittingNewItem = val;
  },
  SET_RAW_BOARDS(state, boards) {
    state.rawBoards = boards;
  },
  SWITCH_PREPEND_NEW_ITEM(state, {prependNewItem}) {
    state.activeBoard.prependNewItem = prependNewItem;
  },
  SWITCH_SHOW_DONE(state, {showDone}) {
    state.activeBoard.showDone = showDone;
  },
  SWITCH_SHOW_PROGRESS(state, val) {
    state.activeBoard.showProgress = val;
  }
};

const actions = {
  addItem({state}, {boardId, newItem}) {
    const activeBoard = state.boardsList.find((board) => board.id === boardId);
    if (activeBoard.prependNewItem === true) {
      return boardsRepository.addItemToBegin(boardId, newItem);
    } else {
      return boardsRepository.addItemToEnd(boardId, newItem);
    }
  },
  changeBoardsOrder(context, moved) {
    boardsRepository.changeBoardsOrder(moved);
  },
  changeFindItem({commit}, val) {
    commit("SET_FIND_ITEM_TEXT", val);
  },
  changeIsDone(context, {boardId, itemId, newVal}) {
    itemsRepository.switchIsDone(boardId, itemId, newVal);
  },
  changeItemVal(context, {boardId, itemId, newVal}) {
    itemsRepository.changeItemValue(boardId, itemId, newVal);
  },
  fetchActiveBoard({commit}) {
    const board = boardsRepository.getBoardById(boardsRepository.getActiveBoard());
    commit("SET_ACTIVE_BOARD", board);
  },
  fetchBoardItems({commit}, boardId) {
    commit("SET_BOARD_ITEMS", boardsRepository.getBoardItems(boardId));
  },
  fetchBoards({commit}) {
    commit("SET_BOARDS", boardsRepository.getList());
  },
  fetchRawBoards({commit}) {
    commit("SET_RAW_BOARDS", boardsRepository.getRawBoards());
  },
  itemsOrderChanged(context, {moved, boardId}) {
    boardsRepository.changeItemsOrder(boardId, moved);
  },
  moveItemToBoard({commit}, {srcBoardId, dstBoardId, itemId}) {
    boardsRepository.moveItemToBoard(srcBoardId, dstBoardId, itemId);
    actions.fetchBoards({commit});
  },
  moveItemToBottom(context, {boardId, itemId}) {
    boardsRepository.moveItemToBottom(boardId, itemId);
  },
  moveItemToTop(context, {boardId, itemId}) {
    boardsRepository.moveItemToTop(boardId, itemId);
  },
  removeBoard(context, boardId) {
    boardsRepository.removeBoard(boardId);
  },
  removeItem({commit}, {boardId, itemId}) {
    itemsRepository.removeItem(boardId, itemId);
    actions.fetchBoards({commit});
  },
  renameBoard(context, {boardId, newName}) {
    boardsRepository.renameBoard(boardId, newName);
  },
  saveNewBoard({commit, rootState}, boardName) {
    const savedBoard = boardsRepository.addNewBoard(boardName, rootState.settings);
    actions.fetchBoards({commit});
    commit("SET_ACTIVE_BOARD", savedBoard);
    return savedBoard.id;
  },
  setActiveBoard({commit}, boardId) {
    boardsRepository.setActiveBoard(boardId);
    const board = boardsRepository.getBoardById(boardId);
    commit("SET_ACTIVE_BOARD", board);
  },
  setFirstBoardAsActiveBoard({commit}) {
    const activeBoard = boardsRepository.getFirstBoard();
    boardsRepository.setActiveBoard(activeBoard.id);
    commit("SET_ACTIVE_BOARD", activeBoard);
    return activeBoard.id;
  },
  setIsSubmittingNewItem({commit}, val) {
    commit("SET_IS_SUBMITTING_NEW_ITEM", val);
  },
  switchPrependNewItem({commit}, {boardId, prependNewItem}) {
    itemsRepository.switchPrependNewItem(boardId, prependNewItem);
    commit("SWITCH_PREPEND_NEW_ITEM", {boardId, prependNewItem});
  },
  switchShowDone({commit}, {boardId, showDone}) {
    boardsRepository.switchShowDone(boardId, showDone);
    commit("SWITCH_SHOW_DONE", {boardId, showDone});
  },
  switchShowProgress({commit}, {boardId, val}) {
    itemsRepository.switchShowProgress(boardId, val);
    commit("SWITCH_SHOW_PROGRESS", val);
  },
  syncBoardsDone({dispatch}, boards) {
    boardsRepository.saveBoardsArray(boards, true);
    dispatch("fetchBoards");
    dispatch("fetchRawBoards");
  },
  updateLastSync({commit}, syncDate) {
    commit("SET_CLOUD_LAST_SYNC", syncDate);
    syncRepository.updateLastSync(syncDate);
  }
};

export default {
  state,
  mutations,
  actions
};
