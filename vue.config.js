module.exports = {
  lintOnSave: false,

  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/dav': {
        target: 'http://localhost:5001/'
      }
    }
  }
}
