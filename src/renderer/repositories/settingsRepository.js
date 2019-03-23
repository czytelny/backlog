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
  },
  showFindItem: {
    mac: ['meta', 'shift', 'f'],
    win: ['ctrl', 'shift', 'f']
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
  keyBindings,
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
  getKeyBindings () {
    return db.get('appSettings.keyBindings')
      .cloneDeep()
      .value()
  },
  hasKeyBindingsProperty () {
    return db.has('appSettings.keyBindings').value()
  },
  addKeyBinding (keyId, keyCombinations) {
    return db
      .get(`appSettings.keyBindings`)
      .set(keyId, keyCombinations)
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
  }
}
