const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dataAdapter = new FileSync('backlog.json')

module.exports = {
  db: low(dataAdapter)
}
