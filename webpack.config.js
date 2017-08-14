const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
    module: {
        rules: [
            {
                test: /js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    }
};

const front = {
    entry: "./src/browser.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    devtool: "cheap-module-source-map",
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
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "public/styles.css"
        })
    ]
};

const back = {
    entry: "./src/server.js",
    target: "node",
    output: {
        path: __dirname,
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "css-loader/locals"
            }
        ]
    }
};

module.exports = [
    Object.assign({}, common, front),
    Object.assign({}, common, back)
];
