module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://pokemonxzj.applinzi.com',
                target: 'http://localhost:5050',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}