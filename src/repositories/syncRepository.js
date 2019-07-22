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
        update: new Date()
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
  initialSync(username, rawBoards, token, lastSync) {
    return axios({
      method: "post",
      url: cloudSettings.boardsUrl(username),
      data: {boards: rawBoards, lastSync},
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
  updateLastSync(syncDate) {
    db.get("appSettings").assign({"lastSync": syncDate}).write();
  },
  patchSync(username, token, lastSync) {
    if (!username || !token) {
      return;
    }
    const queue = db.get("syncQueue").value();

    if (!queue || queue.length === 0) {
      return;
    }

    return axios({
      method: "post",
      url: cloudSettings.boardPatchUrl(username),
      data: {queue, lastSync},
      headers: {"Authorization": `JWT ${token}`}
    });
  }
};
