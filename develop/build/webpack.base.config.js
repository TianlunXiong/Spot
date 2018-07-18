const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry : {
        app : "./src/main.js"
    },
    output : {
        filename: '[name].js',
        path: path.resolve(__dirname,'./dist'),
        publicPath : './'
    },
    module:{
        rules:[
            {
                test : /\.vue$/,
                use  : ["vue-loader"]
            },
            {
                test : /\.js$/,
                use  : ["babel-loader"],
                exclude : /node_modules/
            },
            {
                test : /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [
                    {
                        loader : "url-loader",
                        options:{
                            limit : 9000
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        alias:{
            "vue$" : "vue/dist/vue.common.js"
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title : "Code in ..",
            template : path.resolve(__dirname,"../src/index.html")
        }),
        new CleanWebpackPlugin(['dist']),
    ]
}