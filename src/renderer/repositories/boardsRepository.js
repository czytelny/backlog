const {db} = require('electron').remote.require('./persistence')

const shortid = require('shortid')
const storage = require('electron').remote.require('electron-settings')
const fs = require('electron').remote.require('fs')

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
  saveNewBoard (boardName, defaults) {
    return db
      .get('boards')
      .insert({
        label: boardName,
        showDone: false,
        prependNewItem: defaults.prependNewItems,
        items: []
      })
      .write()
  },
  saveBoardsArray (boardsArray) {
    return db
      .set('boards', boardsArray)
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
      .cloneDeep()
      .value()
  },
  setActiveBoard (boardId) {
    db.set('activeBoard', boardId)
      .write()
  },
  getActiveBoard () {
    return db.get('activeBoard')
      .cloneDeep()
      .value()
  },
  getList () {
    return db
      .get('boards')
      .cloneDeep()
      .value()
  },
  addItemToEnd (boardId, text, created, isDone) {
    return db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .insert({
        isDone: isDone || false,
        created: created || new Date(),
        text
      })
      .write()
  },
  addItemToBegin (boardId, text) {
    return db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .unshift({
        id: shortid.generate(),
        isDone: false,
        created: new Date(),
        text
      })
      .write()
  },
  moveItemToTop (boardId, itemId) {
    const items = db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .value()

    const index = items.findIndex((item) => item.id === itemId)
    const item = items.splice(index, 1)[0]
    items.unshift(item)

    this.saveItemsArray(boardId, items)
  },
  moveItemToBottom (boardId, itemId) {
    const items = db
      .get('boards')
      .find({id: boardId})
      .get('items')
      .value()

    const index = items.findIndex((item) => item.id === itemId)
    const item = items.splice(index, 1)[0]
    items.push(item)

    this.saveItemsArray(boardId, items)
  },
  moveItemToBoard (srcBoardId, dstBoardId, itemId) {
    const items = db
      .get('boards')
      .find({id: srcBoardId})
      .get('items')
      .value()

    const dstItems = db
      .get('boards')
      .find({id: dstBoardId})
      .get('items')
      .value()

    const index = items.findIndex((item) => item.id === itemId)
    const item = items.splice(index, 1)[0]
    dstItems.push(item)

    this.saveItemsArray(srcBoardId, items)
    this.saveItemsArray(dstBoardId, dstItems)
  },
  getItems (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .get('items')
      .cloneDeep()
      .value()
  },
  getBoardById (boardId) {
    return db
      .get('boards')
      .getById(boardId)
      .cloneDeep()
      .value()
  },
  switchShowDone (boardId, value) {
    return db
      .get('boards')
      .updateById(boardId, {showDone: value})
      .write()
  },
  importOldEntries () {
    if (storage.has('boards')) {
      storage.get('boards').forEach((board) => {
        const newBoard = this.saveNewBoard(board.label, {prependNewItem: false})
        if (storage.has(`board-item-${board.id}`)) {
          storage.get(`board-item-${board.id}`).forEach((boardItem) => {
            this.addItemToEnd(newBoard.id, boardItem.text, boardItem.created, boardItem.isDone)
          })
        }
      })
    }
  },
  exportBoardToJSON (fileName, boardId) {
    const boardContent = this.getItems(boardId)
    return new Promise(function (resolve, reject) {
      fs.writeFile(fileName, JSON.stringify(boardContent), function (err) {
        if (err) reject(err)
        resolve()
      })
    })
  },
  exportDbToJSON (fileName) {
    const dbContent = db.getState()
    return new Promise(function (resolve, reject) {
      fs.writeFile(fileName, JSON.stringify(dbContent), function (err) {
        if (err) reject(err)
        resolve()
      })
    })
  },
  importDbFromJSON (filePath) {
    const service = this
    return new Promise(function (resolve, reject) {
      fs.readFile(filePath, 'utf8', function (err, content) {
        if (err) reject(err)
        const db = JSON.parse(content)
        db.boards.forEach((board) => {
          const newBoardObj = service.saveNewBoard(board.label, {prependNewItems: board.prependNewItem})
          board.items.forEach((item) => {
            service.addItemToEnd(newBoardObj.id, item.text, item.created, item.isDone)
          })
        })
        resolve()
      })
    })
  }
}
