import { db } from './../persistence'

db.defaults({
  appSettings: {
    'itemCreationDate': true,
    'prependNewItems': true
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
  }
}
