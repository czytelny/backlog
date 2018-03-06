import { windowSettings } from './../persistence'

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

export default {
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
