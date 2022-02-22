const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  historyApiFallback: true,
  
  devServer: {
    proxy: 'http://localhost:8080'
  }
}
