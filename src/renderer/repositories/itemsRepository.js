const {db} = require('electron').remote.require('./persistence')

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
  },
  changeItemValue (boardId, itemId, itemVal) {
    return db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .find({id: itemId})
      .assign({text: itemVal})
      .write()
  }
}
