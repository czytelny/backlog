import {addToSyncQueue} from "./syncRepository";

const {db} = require("./../persistence");

export default {
  switchPrependNewItem(boardId, value) {
    return db
      .get("boards")
      .updateById(boardId, {prependNewItem: value})
      .write();
  },
  switchIsDone(boardId, itemId, value) {
    return db
      .get("boards")
      .find({id: boardId})
      .get("items")
      .find({id: itemId})
      .assign({isDone: value})
      .write();
  },
  switchShowProgress(boardId, val) {
    return db
      .get("boards")
      .updateById(boardId, {showProgress: val})
      .write();
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
    addToSyncQueue(oldBoardVal, newBoardVal);
  },
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
    addToSyncQueue(oldBoardVal, newBoardVal);
  }
};
