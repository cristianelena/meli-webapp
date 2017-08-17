const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};

const browser = {
    entry: "./src/browser.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    devtool: "source-map",
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
    externals: [
        {
            'isomorphic-fetch': {
                root: 'isomorphic-fetch',
                commonjs2: 'isomorphic-fetch',
                commonjs: 'isomorphic-fetch',
                amd: 'isomorphic-fetch'
            }
        }
    ]
};

module.exports = [
    Object.assign({}, common, browser),
    Object.assign({}, common, server)
];
