const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')

export default function (userAppPath) {
  if (!fs.existsSync(userAppPath.split('window.json')[0])) {
    fs.mkdirSync(userAppPath.split('window.json')[0])
  }
  const windowAdapter = new FileSync(userAppPath)
  const windowSettings = low(windowAdapter)
  windowSettings.defaults({
    windowState: {
      height: 800,
      useContentSize: true,
      width: 600,
      show: false,
      minWidth: 600,
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
