const {db} = require('electron').remote.require('./persistence')

const keyBindings = {
  showKeymap: {
    win: ['ctrl', 'k'],
    mac: ['meta', 'k']
  },
  addNewBoard: {
    win: ['ctrl', 'shift', 'n'],
    mac: ['meta', 'shift', 'n']
  },
  nextTab: {
    win: ['ctrl', 'shift', '}'],
    mac: ['meta', 'shift', ']']
  },
  prevTab: {
    win: ['ctrl', 'shift', '{'],
    mac: ['meta', 'shift', '[']
  },
  newItemFocus: {
    mac: ['meta', 'n'],
    win: ['ctrl', 'n']
  },
  filterItemsFocus: {
    mac: ['meta', 'f'],
    win: ['ctrl', 'f']
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
  updateKeyBinding (keyId, combination, isMac) {
    if (isMac) {
      return db
        .get(`appSettings.keyBindings.${keyId}`)
        .set('mac', combination)
        .write()
    } else {
      return db
        .get(`appSettings.keyBindings.${keyId}`)
        .set('win', combination)
        .write()
    }
  },
  setupKeyBindings () {
    this.updateAppSettings({'keyBindings': keyBindings})
    console.log(db.get('appSettings').value())
  }
}
