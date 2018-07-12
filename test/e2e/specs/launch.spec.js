const utils = require('../utils')

describe('Launch', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows the proper application title', function () {
    return expect(this.app.client.getTitle()).to.eventually.have.string('Backlog')
  })

})
