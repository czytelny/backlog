const {db} = require('electron').remote.require('./persistence')

db.defaults({
  appSettings: {
    'wasImported': false,
    'itemCreationDate': true,
    'prependNewItems': true,
    'showUpdates': true
  }
}).write()

export default {
  getAppSettings () {
    return db.get('appSettings')
      .cloneDeep()
      .value()
  },
  updateAppSettings (updateProp) {
    return db.get('appSettings')
      .assign(updateProp)
      .write()
  }
}
