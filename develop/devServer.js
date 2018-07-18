var app = require('express')();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./build/webpack.dev.config.js');
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,{
    publickPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler,{
    log: false,
    heartbeat: 2000,
}))

app.listen(3500,()=>console.log("Server open..."))