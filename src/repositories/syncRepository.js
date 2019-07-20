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


export default {
  isSync() {
    return db.get("appSettings.token").value().length;
  },
  addAllToSyncQueue(oldBoards, newBoards) {
    if (!this.isSync()) {
      return;
    }
    const delta = jsDiff.diff(oldBoards, newBoards);
    return db
      .get("syncQueue")
      .push({
        delta,
        update: new Date(),
      })
      .write();
  },
  addToSyncQueue(oldBoardVal, newBoardVal) {
    if (!this.isSync()) {
      return;
    }
    const delta = jsDiff.diff(oldBoardVal, newBoardVal);
    if (delta) {
      return db
        .get("syncQueue")
        .push({
          boardId: oldBoardVal.id,
          update: new Date(),
          delta
        })
        .write();
    }
  },
  getBoards(username, rawBoards, token) {
    return axios({
      method: "post",
      url: cloudSettings.boardsSyncGetUrl(username),
      data: {boards: rawBoards},
      headers: {"Authorization": `JWT ${token}`}
    });
  },
  initialSync(username, rawBoards, token) {
    return axios({
      method: "post",
      url: cloudSettings.boardsUrl(username),
      data: {boards: rawBoards},
      headers: {"Authorization": `JWT ${token}`}
    });
  },
  login(username, password) {
    return axios
      .post(cloudSettings.login, {
        username, password
      });
  },
  resetQueue() {
    db.get("syncQueue")
      .remove()
      .write();
  },
  tryConsumeQueue(username, token) {
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
          this.tryConsumeQueue(username, token);
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
          this.tryConsumeQueue(username, token);
        });

    }
  }
};
