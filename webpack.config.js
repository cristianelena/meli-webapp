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
