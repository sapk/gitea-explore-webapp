process.env.VUE_APP_VERSION = require('./package.json').version //TODO add commit offset

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: {
        //plugins: [new BundleAnalyzerPlugin()]
        /*
        output:{
            filename: "[name].bundle.js"
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    */
    }
}