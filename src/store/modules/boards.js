import boardsRepository from "./../../repositories/boardsRepository";
import itemsRepository from "./../../repositories/itemsRepository";
import EmojiIcons from "./../../assets/emojiIcons";

const state = {
  activeBoard: {},
  rawBoards: [],
  boardsList: [],
  boardItems: [],
  isSubmittingNewItem: false,
  findItem: {
    itemText: ""
  },
  addItemEmoji: {
    search: "",
    icons: EmojiIcons,
    activeIndex: 0
  }
};

const mutations = {
  DECREASE_ADD_ITEM_EMOJI_INDEX(state) {
    state.addItemEmoji.activeIndex--;
  },
  INCREASE_ADD_ITEM_EMOJI_INDEX(state) {
    state.addItemEmoji.activeIndex++;
  },
  RESET_ADD_ITEM_EMOJI_INDEX(state) {
    state.addItemEmoji.activeIndex = 0;
  },
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
  decreaseAddItemEmojiIndex({commit}) {
    if (state.addItemEmoji.activeIndex === 0) {
      return;
    }
    commit("DECREASE_ADD_ITEM_EMOJI_INDEX");
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
  increaseAddItemEmojiIndex({commit}) {
    if (Object.keys(state.addItemEmoji.icons).length === state.addItemEmoji.activeIndex) {
      return;
    }
    commit("INCREASE_ADD_ITEM_EMOJI_INDEX");
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
  resetAddItemEmojiIndex({commit}) {
    commit("RESET_ADD_ITEM_EMOJI_INDEX");
  },
  saveNewBoard({commit, rootState}, boardName) {
    const savedBoard = boardsRepository.saveNewBoard(boardName, rootState.settings);
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
  syncBoards() {

  }
};

export default {
  state,
  mutations,
  actions
};
