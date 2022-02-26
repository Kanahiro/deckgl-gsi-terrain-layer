import webpack from 'webpack';
import * as path from 'path';

export default {
    mode: 'development',
    entry: './demo/index.ts',
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'es6-promise',
        }),
    ],
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            'demo',
        ),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: './demo',
            watch: true,
        },
    },
};
