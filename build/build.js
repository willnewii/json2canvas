'use strict';

process.env.NODE_ENV = 'production';

const path = require('path')
const del = require('del')
const webpack = require('webpack');
const chalk = require('chalk');
const { execSync } = require('child_process');

const config = require('../webpack.config');

build();

function build() {
    del.sync(['dist/**', 'dist_miniprogram/**']);

    webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) console.log(err);

        console.log(stats.toString({
            chunks: false,
            colors: true
        }));

        const distFile = config.output.path + '/index.js';

        execSync(`cp -fr ${distFile} ${path.join(__dirname, '../example/weapp/component/json2canvas/json2canvas.js')}`);

        execSync(`cp -fr ${distFile} ${path.join(__dirname, '../example/web/json2canvas.js')}`);
        execSync(`mv ${config.output.path + '/index.html'} ${path.join(__dirname, '../example/web/index.html')}`);

        execSync(`cp -fr ${path.join(__dirname, '../example/weapp/component/json2canvas')} ${path.join(__dirname, '../dist_miniprogram')}`);
        // execSync(`cp -fr ${distFile} ${path.join(__dirname, '../dist_miniprogram/json2canvas.js')}`);

        console.log(chalk.bold.blue('build success!'));
    });
}