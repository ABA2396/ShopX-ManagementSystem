const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //关闭eslint校验
    devServer: {
        //配置跨域
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            }
        }
    },
})
