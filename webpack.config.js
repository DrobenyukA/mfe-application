const path = require('path');
const { dependencies } = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (env, { mode }) => {
    const isDevelopment = mode === 'development';
    const isProduction = mode === 'production';
    const mapApplicationURL = env.MAP_APPLICATION ? env.MAP_APPLICATION : 'https://micro-fe-provider.web.app';
    return {
        entry: path.join(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
        },
        devServer: {
            hot: false,
            https: true,
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                ['@babel/preset-env', { runtime: 'automatic' }],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                },
            ],
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'Main',
                filename: 'remoteEntry.js',
                remotes: {
                    MapApplication: `MapApplication@${mapApplicationURL}/remoteEntry.js`,
                },
                shared: {
                    ...dependencies,
                    react: {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react'],
                    },
                    'react-dom': {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react-dom'],
                    },
                    'react-redux': {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react-redux'],
                    }
                },
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
        ],
    };
};
