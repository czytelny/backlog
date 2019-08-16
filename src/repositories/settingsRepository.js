const {db} = require("./../persistence");

const keyBindings = {
  acceptItemChange: {
    mac: ["meta", "enter"],
    win: ["ctrl", "enter"]
  },
  addNewBoard: {
    win: ["ctrl", "shift", "n"],
    mac: ["meta", "shift", "n"]
  },
  cancelItemChange: {
    mac: ["esc"],
    win: ["esc"]
  },
  filterItemsFocus: {
    mac: ["meta", "f"],
    win: ["ctrl", "f"]
  },
  newItemFocus: {
    mac: ["meta", "n"],
    win: ["ctrl", "n"]
  },
  nextTab: {
    win: ["ctrl", "shift", "}"],
    mac: ["meta", "shift", "]"]
  },
  prevTab: {
    win: ["ctrl", "shift", "{"],
    mac: ["meta", "shift", "["]
  },
  showEmoji: {
    readonly: true,
    mac: ["meta", "e"],
    win: ["ctrl", "e"]
  },
  showFindItem: {
    mac: ["meta", "shift", "f"],
    win: ["ctrl", "shift", "f"]
  },
  showKeymap: {
    win: ["ctrl", "k"],
    mac: ["meta", "k"]
  }
};

db.defaults({
  appSettings: {
    "itemCreationDate": true,
    "keyBindings": keyBindings,
    "prependNewItems": true,
    "showUpdates": true,
    "token": "",
    "username": "",
    "wasImported": false,
    "language": "en"
  }
}).write();

export default {
  addKeyBinding(keyId, keyCombinations) {
    return db
      .get(`appSettings.keyBindings`)
      .set(keyId, keyCombinations)
      .write();
  },
  getAppSettings() {
    return db.get("appSettings")
      .cloneDeep()
      .value();
  },
  getKeyBindings() {
    return db.get("appSettings.keyBindings")
      .cloneDeep()
      .value();
  },
  hasKeyBindingsProperty() {
    return db.has("appSettings.keyBindings").value();
  },
  hasLanguageProperty() {
    return db.has("appSettings.language").value();
  },
  keyBindings,
  setupKeyBindings() {
    this.updateAppSettings({"keyBindings": keyBindings});
  },
  updateAppSettings(updateProp) {
    return db.get("appSettings")
      .assign(updateProp)
      .write();
  },
  updateKeyBinding(keyId, combination, isMac) {
    if (isMac) {
      return db
        .get(`appSettings.keyBindings.${keyId}`)
        .set("mac", combination)
        .write();
    } else {
      return db
        .get(`appSettings.keyBindings.${keyId}`)
        .set("win", combination)
        .write();
    }
  }
};
