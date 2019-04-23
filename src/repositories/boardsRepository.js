import {addToSyncQueue, addAllToSyncQueue} from "./syncRepository";

const {db} = require("./../persistence");

const shortid = require("shortid");
const fs = require("electron").remote.require("fs");

function defaultBoard() {
  return {
    id: "default",
    items: [],
    label: "Default board",
    prependNewItem: false,
    showDone: false,
    showProgress: false
  };
}

db.defaults({
  activeBoard: "default",
  boards: [defaultBoard()]
}).write();

export default {
  addItemToBegin(boardId, text) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const newItem = {
      id: shortid.generate(),
      isDone: false,
      created: new Date(),
      text
    };
    const oldBoardVal = board.cloneDeep().value();
    board
      .get("items")
      .unshift(newItem)
      .write();
    const newBoardVal = board.cloneDeep().value();
    addToSyncQueue(oldBoardVal, newBoardVal);
    return newItem;
  },
  addItemToEnd(boardId, text, created, isDone) {
    const board = db
      .get("boards")
      .find({id: boardId});

    const oldBoardVal = board.cloneDeep().value();
    const writeAction = board
      .get("items")
      .insert({
        isDone: isDone || false,
        created: created || new Date(),
        text
      })
      .write();
    const newBoardVal = board.cloneDeep().value();
    addToSyncQueue(oldBoardVal, newBoardVal);
    return writeAction;
  },
  addNewBoard(boardName, defaults) {
    const boards = db
      .get("boards");

    const oldBoardsVal = boards.cloneDeep().value();
    const res = boards
      .insert({
        label: boardName,
        showDone: false,
        showProgress: false,
        prependNewItem: defaults.prependNewItems,
        items: []
      })
      .write();
    const newBoardsVal = boards.cloneDeep().value();

    addAllToSyncQueue(oldBoardsVal, newBoardsVal);

    return res;
  },
  changeBoardsOrder(movedElement) {
    const allBoards = db
      .get("boards")
      .cloneDeep()
      .value();

    const movedItem = allBoards.splice(movedElement.oldIndex, 1)[0];
    allBoards.splice(movedElement.newIndex, 0, movedItem);
    this.saveBoardsArray(allBoards);
  },
  changeItemsOrder(boardId, movedElement) {
    const items = db
      .get("boards")
      .getById(boardId)
      .get("items")
      .cloneDeep()
      .value();

    const movedItem = items.splice(movedElement.oldIndex, 1)[0];
    items.splice(movedElement.newIndex, 0, movedItem);
    this.saveItemsArray(boardId, items);
  },
  duplicateBoard(boardId, newName) {
    const items = this.getBoardItems(boardId);

    return db
      .get("boards")
      .insert({
        label: newName,
        showDone: false,
        showProgress: false,
        prependNewItem: false,
        items
      })
      .write();
  },
  exportBoardToJSON(fileName, boardId) {
    const boardContent = this.getItems(boardId);
    return new Promise(function(resolve, reject) {
      fs.writeFile(fileName, JSON.stringify(boardContent), function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  },
  exportDbToJSON(fileName) {
    const dbContent = db.getState();
    return new Promise(function(resolve, reject) {
      fs.writeFile(fileName, JSON.stringify(dbContent), function(err) {
        if (err) reject(err);
        resolve();
      });
    });
  },
  get() {
    console.log(`${JSON.stringify(db.getState())}`);
  },
  getActiveBoard() {
    return db.get("activeBoard")
      .cloneDeep()
      .value();
  },
  getBoardById(boardId) {
    return db
      .get("boards")
      .getById(boardId)
      .cloneDeep()
      .value();
  },
  getBoardItems(boardId) {
    return db
      .get("boards")
      .getById(boardId)
      .cloneDeep()
      .value()
      .items;
  },
  getFirstBoard() {
    return db.get("boards")
      .first()
      .cloneDeep()
      .value();
  },
  getItems(boardId) {
    return db
      .get("boards")
      .getById(boardId)
      .get("items")
      .cloneDeep()
      .value();
  },
  getList() {
    function doneItemsCount(boardItems) {
      return boardItems.filter(item => item.isDone === true).length;
    }

    function progressCount(board) {
      const res = Math.round((doneItemsCount(board.items) / board.items.length) * 100);
      if (isNaN(res)) {
        return 0;
      }
      return res;
    }

    return db
      .get("boards")
      .cloneDeep()
      .value()
      .map((board) => {
        return {
          id: board.id,
          label: board.label,
          progress: progressCount(board),
          prependNewItem: board.prependNewItem,
          showDone: board.showDone,
          showProgress: board.showProgress
        };
      });
  },
  getRawBoards() {
    return db
      .get("boards")
      .cloneDeep()
      .value();
  },
  importDbFromJSON(filePath) {
    const service = this;
    return new Promise(function(resolve, reject) {
      fs.readFile(filePath, "utf8", function(err, content) {
        if (err) reject(err);
        const db = JSON.parse(content);
        db.boards.forEach((board) => {
          const newBoardObj = service.saveNewBoard(board.label, {prependNewItems: board.prependNewItem});
          board.items.forEach((item) => {
            service.addItemToEnd(newBoardObj.id, item.text, item.created, item.isDone);
          });
        });
        resolve();
      });
    });
  },
  moveItemToBoard(srcBoardId, dstBoardId, itemId) {
    if (srcBoardId === dstBoardId) {
      return;
    }
    const items = db
      .get("boards")
      .find({id: srcBoardId})
      .get("items")
      .cloneDeep()
      .value();

    const dstItems = db
      .get("boards")
      .find({id: dstBoardId})
      .get("items")
      .cloneDeep()
      .value();

    const index = items.findIndex((item) => item.id === itemId);
    const item = items.find((item) => item.id === itemId);
    if (!item) {
      return;
    }
    const srcItems = [...items.slice(0, index), ...items.slice(index + 1, items.length)];
    dstItems.push(item);
    this.saveItemsArray(srcBoardId, srcItems);
    this.saveItemsArray(dstBoardId, dstItems);
  },
  moveItemToBottom(boardId, itemId) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const items = board
      .get("items")
      .value();
    const oldBoardVal = board.cloneDeep().value();

    const index = items.findIndex((item) => item.id === itemId);
    const item = items.splice(index, 1)[0];
    items.push(item);

    this.saveItemsArray(boardId, items);
    const newBoardVal = board.cloneDeep().value();
    addToSyncQueue(oldBoardVal, newBoardVal);
  },
  moveItemToTop(boardId, itemId) {
    const board = db
      .get("boards")
      .find({id: boardId});
    const items = board
      .get("items")
      .value();

    const oldBoardVal = board.cloneDeep().value();
    const index = items.findIndex((item) => item.id === itemId);
    const item = items.splice(index, 1)[0];
    items.unshift(item);

    this.saveItemsArray(boardId, items);
    const newBoardVal = board.cloneDeep().value();
    addToSyncQueue(oldBoardVal, newBoardVal);
  },
  removeBoard(boardId) {
    db.get("boards")
      .remove({id: boardId})
      .write();
  },
  renameBoard(boardId, value) {
    return db
      .get("boards")
      .updateById(boardId, {label: value})
      .write();
  },
  saveBoardsArray(boardsArray) {
    return db
      .set("boards", boardsArray)
      .write();
  },
  saveItemsArray(boardId, items) {
    return db
      .get("boards")
      .getById(boardId)
      .set("items", items)
      .write();
  },
  setActiveBoard(boardId) {
    db.set("activeBoard", boardId)
      .write();
  },
  switchShowDone(boardId, value) {
    return db
      .get("boards")
      .updateById(boardId, {showDone: value})
      .write();
  }
};
