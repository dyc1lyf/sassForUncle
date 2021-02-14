
// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/_admin_manage';

module.exports = {
    // 根据你的实际情况更改这里
    publicPath,
    lintOnSave: true,
    assetsDir: './',
    devServer: {
        publicPath, // 和 publicPath 保持一致,
        proxy: {
            '/api': {
                // target: 'http://192.168.0.226:1017',
                // target: 'https://app.hualhf.com',
                target: 'https://demo.hualhf.com/api_admin',
                ws: false,
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack:{
        externals: {
            'AMap': 'AMap'
        }
    },
}