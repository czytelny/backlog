import db from '@/persistence'

import lodashId from 'lodash-id'

db._.mixin(lodashId)

db.defaults({
  activeBoard: null,
  boards: []
}).write()

export default {
  get () {
    console.log(`${JSON.stringify(db.getState())}`)
  },
  saveNewBoard (newBoard) {
    db
      .get('boards')
      .insert(newBoard)
      .write()
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
  }
}
