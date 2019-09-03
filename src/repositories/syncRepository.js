import axios from 'axios';
import cloudSettings from './../cloud';
import {DiffPatcher} from 'jsondiffpatch';

const {db} = require('./../persistence');

const jsDiff = new DiffPatcher({
  objectHash: (obj) => {
    return obj.id;
  },
});

db.defaults({
  syncQueue: [],
}).write();

export default {
  isSync() {
    if (!db.get('appSettings.token').value()) {
      return false;
    }
    return !!db.get('appSettings.token').value().length && !!db.get('appSettings.username').value();
  },
  addAllToSyncQueue() {
    if (!this.isSync()) {
      return;
    }
    return db
      .get('syncQueue')
      .push('all')
      .write();
  },
  addToSyncQueue(oldBoardVal, newBoardVal) {
    if (!this.isSync()) {
      return;
    }
    const delta = jsDiff.diff(oldBoardVal, newBoardVal);
    if (delta) {
      return db
        .get('syncQueue')
        .push({
          boardId: oldBoardVal.id,
          updated: new Date(),
          delta,
        })
        .write();
    }
  },
  initialSync(username, rawBoards, token, lastSync) {
    return axios({
      method: 'post',
      url: cloudSettings.boardsUrl(username, lastSync),
      data: {boards: rawBoards},
      headers: {'Authorization': `JWT ${token}`},
    });
  },
  login(username, password) {
    return axios
      .post(cloudSettings.login, {
        username, password,
      });
  },
  resetQueue() {
    db.get('syncQueue')
      .remove()
      .write();
  },
  updateLastSync(syncDate) {
    db.get('appSettings').assign({'lastSync': syncDate}).write();
  },
  patchSync(username, token, lastSync) {
    if (!username || !token) {
      return Promise.reject();
    }
    const queue = db.get('syncQueue').value();

    if (!queue || queue.length === 0) {
      return axios({
        method: 'get',
        url: cloudSettings.boardsUrl(username, lastSync),
        headers: {'Authorization': `JWT ${token}`},
      });
    }

    return axios({
      method: 'post',
      url: cloudSettings.boardPatchUrl(username, lastSync),
      data: {queue},
      headers: {'Authorization': `JWT ${token}`},
    });
  },
};
