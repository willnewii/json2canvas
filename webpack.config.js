const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')

let config = {
    mode: 'production',
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
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyPlugin([{ from: path.join(__dirname, './example/weapp/component/json2canvas'), to: path.join(__dirname, './dist_miniprogram') }]),
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

module.exports = config