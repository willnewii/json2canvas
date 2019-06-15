const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    mode: process.env.BUILD_TARGET,
    entry: {
        index: path.join(__dirname, './src/json2canvas.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './dist'),
        library: pkg.name,
        libraryTarget: 'umd'
    },
    externals: {
        cax: 'cax'
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.BUILD_TARGET) }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            mode: process.env.BUILD_TARGET,
            inject: false,
            template: './index.dev.html',
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        /* rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ] */
    }
}

if (process.env.BUILD_TARGET == 'development') {
    config.devServer = {
        port: 8088,
        contentBase: path.join(__dirname, './example/web'),
        watchContentBase: true
    }
    delete config.externals;
}

module.exports = config