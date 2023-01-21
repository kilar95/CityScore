const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: './src/js/index.js'
        // api: './src/js/api/teleportAPI.js',
        // city: './src/js/city.js',
        // showcity: './src/js/showCity.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html'),
        }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[contenthash].css',
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: { minimize: true },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'],
                    }
                },
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
        ]
    },
    devServer: {
        port: 5000,
        open: {
            app: {
                name: 'chrome'
            }
        },
        static: path.resolve(__dirname, 'dist')
    },
    experiments: {
        topLevelAwait: true
    }
}