import syncRepository from "./syncRepository";

const {db} = require("./../persistence");

export default {
  changeItemValue(boardId, itemId, itemVal) {
    const board = db
      .get("boards")
      .find({id: boardId});

    const oldBoardVal = board.cloneDeep().value();
    board
      .get("items")
      .find({id: itemId})
      .assign({text: itemVal})
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);
  },
  removeItem(boardId, itemId) {
    const board = db
      .get("boards")
      .find({id: boardId});

    const oldBoardVal = board.cloneDeep().value();
    board
      .get("items")
      .remove({id: itemId})
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);
  },
  switchIsDone(boardId, itemId, value) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const oldBoardVal = board.cloneDeep().value();

    const res = board
      .get("items")
      .find({id: itemId})
      .assign({isDone: value})
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  },
  switchPrependNewItem(boardId, value) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const oldBoardVal = board.cloneDeep().value();

    const res = board
      .assign({prependNewItem: value})
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  },
  switchShowProgress(boardId, val) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const oldBoardVal = board.cloneDeep().value();

    const res = board
      .assign({showProgress: val})
      .write();
    const newBoardVal = board.cloneDeep().value();
    syncRepository.addToSyncQueue(oldBoardVal, newBoardVal);

    return res;
  }
};
