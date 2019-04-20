const {db} = require("./../persistence");

const keyBindings = {
  showKeymap: {
    win: ["ctrl", "k"],
    mac: ["meta", "k"]
  },
  addNewBoard: {
    win: ["ctrl", "shift", "n"],
    mac: ["meta", "shift", "n"]
  },
  nextTab: {
    win: ["ctrl", "shift", "}"],
    mac: ["meta", "shift", "]"]
  },
  prevTab: {
    win: ["ctrl", "shift", "{"],
    mac: ["meta", "shift", "["]
  },
  newItemFocus: {
    mac: ["meta", "n"],
    win: ["ctrl", "n"]
  },
  filterItemsFocus: {
    mac: ["meta", "f"],
    win: ["ctrl", "f"]
  },
  showFindItem: {
    mac: ["meta", "shift", "f"],
    win: ["ctrl", "shift", "f"]
  },
  acceptItemChange: {
    mac: ["meta", "enter"],
    win: ["ctrl", "enter"]
  },
  cancelItemChange: {
    mac: ["esc"],
    win: ["esc"]
  },
  showEmoji: {
    readonly: true,
    mac: ["meta", "e"],
    win: ["ctrl", "e"]
  }
};

db.defaults({
  appSettings: {
    "wasImported": false,
    "itemCreationDate": true,
    "prependNewItems": true,
    "showUpdates": true,
    "keyBindings": keyBindings,
    "token": "",
    "username": ""
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
