const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = {
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
                test: /js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }
        ]
    }
};

const front = {

};


const back = {

};

module.exports = [front, back];
