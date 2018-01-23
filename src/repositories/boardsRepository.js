import db from './../persistence'

import lodashId from 'lodash-id'

const shortid = require('shortid')

db._.mixin(lodashId)

db.defaults({
  activeBoard: 'default',
  boards: [{
    id: 'default',
    label: 'Default board',
    showDone: false,
    prependNewItem: false,
    items: []
  }]
}).write()

export default {
  get () {
    console.log(`${JSON.stringify(db.getState())}`)
  },
  switchPrependNewItem (boardId, value) {
    return db
      .get('boards')
      .updateById(boardId, {prependNewItem: value})
      .write()
  },
  saveNewBoard (boardName) {
    return db
      .get('boards')
      .insert({
        label: boardName,
        showDone: false,
        prependNewItem: false,
        items: []
      })
      .write()
  },
  removeBoard (boardId) {
    db.get('boards')
      .remove({id: boardId})
      .write()
  },
  setActiveBoard (boardId) {
    db.set('activeBoard', boardId)
      .write()
  },
  getActiveBoard () {
    return db.get('activeBoard')
      .value()
  },
  getBoard (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .value()
  },
  getList () {
    return db
      .get('boards')
      .value()
  },
  addItemToEnd (boardId, item) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .insert(item)
      .write()
  },
  addItemToBegin (boardId, item) {
    item.id = shortid.generate()
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .unshift(item)
      .write()
  },
  getItems (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .value()
  }
}
