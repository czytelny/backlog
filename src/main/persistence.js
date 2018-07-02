const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')

const dataAdapter = new FileSync(global['userDataPath'])
let db = low(dataAdapter)

db._.mixin(lodashId)

module.exports = {
  db
}
