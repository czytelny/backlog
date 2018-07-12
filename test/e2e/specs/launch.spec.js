const utils = require('../utils')

describe('Launch', function () {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows the proper application title', function () {
    return expect(this.app.client.getTitle()).to.eventually.have.string('Backlog')
  })

  it('should focus on input of active tab when app is started', function () {
    return expect(this.app.client.hasFocus(`//div[@class="tab-content"][@style="visibility: visible;"]/form//input[@type="text"]`)).to.eventually.be.true
  })
})
