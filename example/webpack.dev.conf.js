const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const  merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        port:3002
    },
    plugins:[
        new CopyWebpackPlugin([{
            from:path.join(__dirname,'./public'),
            to:'static',
            ignore: ['.*']
        }])
    ]
})