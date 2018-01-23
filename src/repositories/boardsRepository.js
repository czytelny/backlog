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
  saveItemsArray (boardId, items) {
    return db
      .get('boards')
      .getById(boardId)
      .set('items', items)
      .write()
  },
  removeBoard (boardId) {
    db.get('boards')
      .remove({id: boardId})
      .write()
  },
  getFirstBoard () {
    return db.get('boards')
      .first()
      .value()
  },
  setActiveBoard (boardId) {
    db.set('activeBoard', boardId)
      .write()
  },
  getActiveBoard () {
    return db.get('activeBoard')
      .value()
  },
  getList () {
    return db
      .get('boards')
      .cloneDeep()
      .value()
  },
  addItemToEnd (boardId, text) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .insert({
        isDone: false,
        created: new Date(),
        text
      })
      .write()
  },
  addItemToBegin (boardId, text) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .unshift({
        id: shortid.generate(),
        isDone: false,
        created: new Date(),
        text
      })
      .write()
  },
  getItems (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .cloneDeep()
      .value()
  },
  switchShowDone (boardId, value) {
    return db
      .get('boards')
      .updateById(boardId, {showDone: value})
      .write()
  }
}
