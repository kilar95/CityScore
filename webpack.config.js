const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { PassThrough } = require('stream');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        main: path.resolve(__dirname, './src/js/index.js'),
        api: './src/js/api/teleportAPI.js',
        city: './src/js/city.js',
        showcity: './src/js/showCity.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        configFile: path.resolve(__dirname, 'babel.config.js'),
                    }
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|bmp|webp)$/i,
                type: 'asset/resource',
              },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    experiments: {
        topLevelAwait: true
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
   },
}