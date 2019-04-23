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
    .insert({
      boardId: oldBoardVal.id,
      delta
    })
    .write();
}
