const {db} = require("./../persistence");
import {DiffPatcher} from "jsondiffpatch";

const jsDiff = new DiffPatcher({
  objectHash: (obj) => {
    return obj.id;
  }
});

db.defaults({
  syncQueue: []
}).write();

export function addToSyncQueue(oldBoardVal, newBoardVal) {
  const delta = jsDiff.diff(oldBoardVal, newBoardVal);

  return db
    .get("syncQueue")
    .push({
      boardId: oldBoardVal.id,
      delta
    })
    .write();
}

export function addAllToSyncQueue(oldBoards, newBoards){
  const delta = jsDiff.diff(oldBoards, newBoards);
  return db
    .get("syncQueue")
    .push({
      delta
    })
    .write();
}
