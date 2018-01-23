import db from './../persistence'

import lodashId from 'lodash-id'

db._.mixin(lodashId)

export default {
  switchPrependNewItem (boardId, value) {
    return db
      .get('boards')
      .updateById(boardId, {prependNewItem: value})
      .write()
  },
  switchIsDone (boardId, itemId, value) {
    return db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .find({id: itemId})
      .assign({isDone: value})
      .write()
  },
  removeItem (boardId, itemId) {
    return db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .remove({id: itemId})
      .write()
  }
}
