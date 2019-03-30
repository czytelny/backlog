const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lodashId = require('lodash-id');

const userDataPath = require('electron').remote.getCurrentWindow().userDataPath;

const dataAdapter = new FileSync(userDataPath);
let db = low(dataAdapter);

db._.mixin(lodashId);

module.exports = {
  db
};
