const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dataAdapter = new FileSync('backlog.json')
const windowAdapter = new FileSync('window.json')

module.exports = {
  db: low(dataAdapter),
  windowSettings: low(windowAdapter)
}
