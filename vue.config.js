const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {

  configureWebpack: {
    devServer: {
      proxy: 'http://localhost:8080',
      historyApiFallback: true
    }
  }
  

}
