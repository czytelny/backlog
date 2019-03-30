module.exports = {
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
  },
  pluginOptions: {
    electronBuilder: {}
  }
};
