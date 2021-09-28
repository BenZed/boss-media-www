/* global require process module __dirname */

/* eslint-disable 
    @typescript-eslint/no-var-requires,
    @typescript-eslint/no-unsafe-call,
    @typescript-eslint/no-unsafe-assignment,
    @typescript-eslint/no-unsafe-member-access
*/

// Requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const styledComponentsTransformer =
    require('typescript-plugin-styled-components').default()

const path = require('path')

// Data 

const OUTPUT = path.resolve(__dirname, 'public')
const PORT = 7000

const mode = process.env.NODE_ENV || 'development'

const ENV = {
    ENV: mode
}

// Config
module.exports = {

    mode,

    entry: './src/client/index.tsx',

    output: {
        filename: 'boss-media-www.js',
        path: OUTPUT,
        publicPath: '/'
    },

    devServer: {
        compress: true,
        port: PORT,
        historyApiFallback: true,
        host: '0.0.0.0'
    },

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: {
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: () => ({
                            before: [styledComponentsTransformer]
                        })
                    }
                },
                exclude: /node_modules/,

            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]@[contenthash].[ext]'
                    }
                }
            }
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Global Mechanic Asset Review Tool',
            template: './src/client/index.html',
            inject: 'head'
        }),
        new EnvironmentPlugin(ENV)
    ]

}