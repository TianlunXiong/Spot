var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var webpack = require('webpack');

module.exports = {
    entry :  ['webpack-hot-middleware/client?noInfo=true&reload=true','./src/entry.js'],
    mode: 'development',
    output:{
        filename: "[name].js",
        path : path.resolve(__dirname,"../dist"),
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test : /\.css$/,
                use  : ['style-loader','css-loader']
            },
            {
                test : /\.scss$/,
                use  : ['style-loader','css-loader','sass-loader']
            },
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
        extensions:['.json','.js','.vue'],
        alias:{
            "vue$" : "vue/dist/vue.runtime.esm.js",
            "src"  : path.resolve(__dirname,'../src'),
            "assets": path.resolve(__dirname,'../src/assets'),
            "components": path.resolve(__dirname,'../src/components'),
            "pages": path.resolve(__dirname,'../src/pages')
        }
    },
    devtool : "#eval-source-map",
    plugins:[
        new HtmlWebpackPlugin({
            title : 'Opp..',
            template : './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
    
}