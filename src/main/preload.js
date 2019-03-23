if (process.env.NODE_ENV !== 'development') {
  window.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
