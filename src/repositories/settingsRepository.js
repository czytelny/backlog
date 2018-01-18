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
  }
}
