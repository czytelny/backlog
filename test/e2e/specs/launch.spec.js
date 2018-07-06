const utils = require('../utils')

describe('Launch', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows the proper application title', function () {
    return expect(this.app.client.getTitle()).to.eventually.have.string('Backlog')
  })

  it('should open add new board modal', function () {
    // when
    this.app.client.click('#add-new-board-btn')
      .then(() => {
        return expect(this.app.client.isVisible('#new-board-modal')).to.eventually.be.true
      })
  })
})
