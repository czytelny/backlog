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
  addAllToSyncQueue(oldBoards, newBoards) {
    const delta = jsDiff.diff(oldBoards, newBoards);
    return db
      .get("syncQueue")
      .push({
        delta
      })
      .write();
  },
  addToSyncQueue(oldBoardVal, newBoardVal) {
    const delta = jsDiff.diff(oldBoardVal, newBoardVal);
    if (delta) {
      return db
        .get("syncQueue")
        .push({
          boardId: oldBoardVal.id,
          delta
        })
        .write();
    }
  },
  getBoards(username, rawBoards, token) {
    username="chwedczuk.m@gmail.com"
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNod2VkY3p1ay5tQGdtYWlsLmNvbSIsImlhdCI6MTU1NTk2MTAzNH0.PrZ8TbgpbEx6SwD7nesDdBUSaqdVDH3agS68y2z2CTc"
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
