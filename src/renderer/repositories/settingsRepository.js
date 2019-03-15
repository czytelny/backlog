const {db} = require('electron').remote.require('./persistence')

const keyBindings = {
  addNewBoard: {
    win: ['ctrl', 'shift', 'n'],
    mac: ['meta', 'shift', 'n']
  }
}

db.defaults({
  appSettings: {
    'wasImported': false,
    'itemCreationDate': true,
    'prependNewItems': true,
    'showUpdates': true,
    'keyBindings': keyBindings
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
  },
  setupKeyBindings () {
    this.updateAppSettings({'keyBindings': keyBindings})
    console.log(db.get('appSettings').value())
  }
}
