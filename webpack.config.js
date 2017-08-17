const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const isProduction = process.env.NODE_ENV === 'production';


const common = {
    resolve: {
        alias: {
            components: __dirname + '/src/components'
        },
        extensions: ['.js', '.jsx', '.json']
    }
};

const browser = {
    entry: "./src/browser.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1
                            }
                        },
                        "postcss-loader"
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "public/styles.css"
        }),
        new webpack.DefinePlugin({
            'isBROWSER': JSON.stringify(true),
            'SERVER_HOST': '""',
            'SERVER_PORT': '""',
            'API_ENDPOINT': '"api/items"'
        })
    ]
};

const server = {
    entry: "./src/server.js",
    target: "node",
    output: {
        path: __dirname,
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "css-loader/locals"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'isBROWSER': JSON.stringify(false),
            'SERVER_HOST': '"http://localhost"',
            'SERVER_PORT': '"3000"',
            'API_ENDPOINT': '"api/items"'
        })
    ],
    externals: [ nodeExternals({
        whitelist: [ 'react', 'react-dom/server', {
            'isomorphic-fetch': {
                root: 'isomorphic-fetch',
                commonjs2: 'isomorphic-fetch',
                commonjs: 'isomorphic-fetch',
                amd: 'isomorphic-fetch'
            }
        } ]
    }) ]
};

if (isProduction) {
    browser.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
    ]);
}

module.exports = [
    Object.assign({}, common, browser),
    Object.assign({}, common, server)
];
