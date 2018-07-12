const electron = require('electron')
const Application = require('spectron').Application
const path = require('path')

module.exports = {
  afterEach () {
    this.timeout(5000)

    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  },
  beforeEach () {
    this.timeout(5000)
    this.app = new Application({
      path: electron,
      args: ['dist/electron/main.js'],
      startTimeout: 10000,
      waitTimeout: 10000
    })

    return this.app.start()
  }
}
