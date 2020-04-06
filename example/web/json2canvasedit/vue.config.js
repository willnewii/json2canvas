const path = require('path');

// const publicPath = process.env.NODE_ENV === 'production' ? 'http://blog-res.mayday5.me/123321/' : './';
const publicPath = './';

module.exports = {
    publicPath: publicPath,
    outputDir: 'dist',
    productionSourceMap: false,
    devServer: {
        open: true,
        https: false
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            "view-design": 'iview',
            "iview": 'ViewUI',
        };

        //提取公共样式
        /* config.optimization.splitChunks.cacheGroups.styles = {
            name: 'styles',
            test: /\.(sass|scss|css)(\?.*)?$/,
            chunks: 'all',
            enforce: true,
            priority: 20,
            minChunks: 1,
        } */

        /* if (process.env.NODE_ENV === 'production') {
            // let extractCss = config.plugin('extract-css')
            // delete extractCss.chunkFilename ;
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        } */
    },
    chainWebpack: config => {
        // https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
        /**
         * 页面异步加载打包后，样式能否打包到一个css文件中
         * https://github.com/vuejs/vue-cli/issues/2843#issuecomment-458802639
         * 这里的 appStyles 中的 app 是入口文件的配置名称(从 vue inspect 中可以得到)
         */
        const splitOptions = config.optimization.get('splitChunks');
        splitOptions.cacheGroups.appStyles = {
            name: 'styles',
            test: (m, c, entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            minChunks: 1,
            enforce: true
        };
        config.optimization.splitChunks(splitOptions);

        /**
         * 移除console
         * https://github.com/vuejs/vue-cli/issues/3088#issuecomment-572899228
         * https://github.com/terser/terser#compress-options
         */
        config.optimization.minimizer('terser').tap((args) => {
            args[0].terserOptions.compress.drop_console = true;
            return args;
        });

        /**
         * 添加构建时间
         */
        config.plugin('define').tap(args => {
            args[0]['process.env']['buildTime'] = Date.now();
            return args;
        });
    }
};

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}
