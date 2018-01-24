import db from './../persistence'

db.defaults({
  windowState: {
    height: 800,
    useContentSize: true,
    width: 400,
    show: false,
    minWidth: 300,
    x: undefined,
    y: undefined
  },
  appSettings: {
    itemCreationDate: false
  }
}).write()

export default {
  getWindowState () {
    return db.get('windowState')
      .value()
  },
  updateWindowState (updateProp) {
    return db.get('windowState')
      .assign(updateProp)
      .write()
  },
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
