import axios from "axios";
import cloudSettings from "./../cloud";
import {DiffPatcher} from "jsondiffpatch";

const {db} = require("./../persistence");

const jsDiff = new DiffPatcher({
  objectHash: (obj) => {
    return obj.id;
  }
});

db.defaults({
  syncQueue: []
}).write();


export function addAllToSyncQueue(oldBoards, newBoards) {
  const delta = jsDiff.diff(oldBoards, newBoards);
  return db
    .get("syncQueue")
    .push({
      delta
    })
    .write();
}

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

export function initialSync(username, rawBoards, token) {
  return axios({
    method: "post",
    url: cloudSettings.boardsUrl(username),
    data: {boards: rawBoards},
    headers: {"Authorization": `JWT ${token}`}
  });
}

export function login(username, password) {
  return axios
    .post(cloudSettings.login, {
      username, password
    });
}

export function resetQueue() {
  db.get("syncQueue")
    .remove()
    .write();
}

export function tryConsumeQueue(username, token) {
  if (!username || !token) {
    return;
  }
  const syncQueue = db.get("syncQueue");
  const queue = syncQueue.value();
  if (!queue || queue.length === 0) {
    return;
  }
  const firstElement = syncQueue.shift().value();
  if (firstElement.boardId) {
    axios({
      method: "put",
      url: cloudSettings.boardPatchUrl(firstElement.boardId, username),
      data: {delta: firstElement.delta},
      headers: {"Authorization": `JWT ${token}`}
    })
      .then(() => {
        syncQueue.write();
        tryConsumeQueue(username, token);
      });
  } else {
    axios({
      method: "put",
      url: cloudSettings.boardsUrl(username),
      data: {delta: firstElement.delta},
      headers: {"Authorization": `JWT ${token}`}
    })
      .then(() => {
        db.get("syncQueue").set(queue).write();
        tryConsumeQueue(username, token);
      });

  }
}
