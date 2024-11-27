'use strict'
const path = require('path') // 用于路径

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'name',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    disableHostCheck: true
  },
};
