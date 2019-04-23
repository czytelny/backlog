import {addToSyncQueue} from "./syncRepository";

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
    addToSyncQueue(oldBoardVal, newBoardVal);
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
  switchIsDone(boardId, itemId, value) {
    return db
      .get("boards")
      .find({id: boardId})
      .get("items")
      .find({id: itemId})
      .assign({isDone: value})
      .write();
  },
  switchPrependNewItem(boardId, value) {
    return db
      .get("boards")
      .updateById(boardId, {prependNewItem: value})
      .write();
  },
  switchShowProgress(boardId, val) {
    return db
      .get("boards")
      .updateById(boardId, {showProgress: val})
      .write();
  },
};
