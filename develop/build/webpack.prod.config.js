var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    entry : {
        entry : "./src/entry.js",
        vendors: ["vue-quill-editor"]
    },
    output:{
        filename: "[name].[chunkhash].js",
        path : path.resolve(__dirname,"../dist")
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
    plugins:[
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            title : 'Opp..',
            template : './src/index.html'
        }),
        new CleanWebpackPlugin(['./dist'],{
            root : path.resolve(__dirname,'../')
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 4,
            maxInitialRequests: 2,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        })
    ]
    
}