const path = require('path');
const webpack = require('webpack');

const config = {
    entry: "./app/app.js",
    output: {
        filename: 'app.min.js',
        path: './public/static/'
    },
    devtool: "eval-source-map",
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loaders: ["style", "css?modules&localIdentName=[name]---[local]---[hash:base64:5]"]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
module.exports = config;
