const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {remote} = require('electron')

const dataAdapter = new FileSync(remote.getGlobal('userDataPath'))

module.exports = {
  db: low(dataAdapter)
}
