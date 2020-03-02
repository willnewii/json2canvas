const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: {
                    arrows: false,
                    collapse_vars: false,
                    comparisons: false,
                    computed_props: false,
                    hoist_funs: false,
                    hoist_props: false,
                    hoist_vars: false,
                    inline: false,
                    loops: false,
                    negate_iife: false,
                    properties: false,
                    reduce_funcs: false,
                    reduce_vars: false,
                    switches: false,
                    toplevel: false,
                    typeofs: false,
                    booleans: true,
                    if_return: true,
                    sequences: true,
                    unused: true,
                    conditionals: true,
                    dead_code: true,
                    evaluate: true,
                    drop_console: true
                },
                mangle: {
                    safari10: true
                }
            },
            sourceMap: false,
            cache: true,
            parallel: true,
            extractComments: false
        })]
    },
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