module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      'server': {
        target: 'http://api.m.taobao.com/rest/api3.do',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口
      // add添加新的打包入口
      config.entry('app').clear().add('./src/main-prod.js')
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
