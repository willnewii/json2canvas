'use strict';

process.env.NODE_ENV = 'production';

const path = require('path')
const del = require('del')
const webpack = require('webpack');
const fs = require('fs-extra');

const config = require('../webpack.config');

del.sync(['dist/**', 'dist_miniprogram/**']);

build();

function build() {
    webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) console.log(err);

        console.log(stats.toString({
            chunks: false,
            colors: true
        }));

        const distFile = config.output.path + '/index.js';

        fs.copySync(distFile, path.join(__dirname, '../example/weapp/component/json2canvas/json2canvas.js'));
        fs.copySync(distFile, path.join(__dirname, '../dist_miniprogram/json2canvas.js'));

        console.log('build success!');
    });
}