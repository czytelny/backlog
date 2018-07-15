const utils = require('../utils')
const randomName = require('sillyname')

describe('Board', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)
  const newBoardName = randomName()

  it('should add new board', function () {
    console.log(`Adding new board "${newBoardName}"`)

    return this.app.client
      .click('#add-new-board-btn')
      .then(() => {
        return this.app.client
          .element('#newBoardNameInput')
          .setValue(newBoardName)
      })
      .then(() => {
        return this.app.client.click('#saveNewBoardBtn')
      })
      .then(() => {
        return expect(this.app.client.isVisible(`//span[contains(text(), "${newBoardName}")]`)).to.eventually.be.true
      })
  })

  it('should add new item to board', function () {
    const newItem = randomName()
    const inputSelector = `//div[@class="tab-content"][@style="visibility: visible;"]/form//input[@type="text"]`

    return this.app.client
      .waitForVisible(inputSelector)
      .then(() => {
        const inputElement = this.app.client.element(inputSelector)
        return inputElement.setValue(newItem)
      })
      .then(() => {
        return this.app.client.keys('Enter')
      })
      .then(() => {
        return expect(this.app.client
          .waitForVisible(`//span[@class="item-text"]/p[contains(text(), '${newItem}')]`))
          .to.eventually.be.true
      })
  })

  it('should remove newly added board', function () {
    console.log(`Removing board "${newBoardName}"`)
    return this.app.client
      .click(`//span[contains(text(), "${newBoardName}")]/following-sibling::i`)
      .then(() => {
        return this.app.client.click('//button/span[contains(text(), "OK, remove it")]')
      })
      .then(() => {
        return expect(this.app.client.isVisible('span=' + newBoardName)).to.eventually.be.false
      })
  })
})
