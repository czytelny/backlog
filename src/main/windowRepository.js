const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

export default function (userAppPath) {
  const windowAdapter = new FileSync(userAppPath)
  const windowSettings = low(windowAdapter)
  windowSettings.defaults({
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

  return {
    getWindowState () {
      return windowSettings.get('windowState')
        .cloneDeep()
        .value()
    },
    updateWindowState (updateProp) {
      return windowSettings.get('windowState')
        .assign(updateProp)
        .write()
    }
  }
}
