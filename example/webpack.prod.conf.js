const path = require('path')
const merge =require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const UglifyStatcJSWebpackPlugin = require('../index')

module.exports = merge(baseConfig,{
    mode:'production',
    plugins:[
        new CopyWebpackPlugin([{
            from:path.join(__dirname,'./public'),
            to:'static'
        }]),
        new UglifyStatcJSWebpackPlugin({ staticPaths: ['./static/mylib.js']})
    ]
})