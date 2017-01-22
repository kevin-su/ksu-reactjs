var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = { 
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client',
        './src/js/app.bootstrap.js'
    ],
     output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/static/'
    },
    devServer: {
        contentBase: './build',
        inline: true
    },
     module: {   
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, './src/js')
            ],
            exclude: [
                path.resolve(__dirname, './src/js/**', '*.spec.js')
            ],
            query: {
                presets: ['es2015', 'react', 'react-hmre']
            }
        }, {
            test: /\.scss$/,
            includePaths: [
                path.resolve(__dirname, './src/scss')
            ],
            loader: ExtractTextPlugin.extract('css!sass!autoprefixer-loader?browsers=last 2 versions')
        }]
    },
    devtool: 'inline-source-map',
    debug: true,
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/app.css'),
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/img', to: 'img' },
            { from: './node_modules/open-iconic/svg', to: 'svg/open-iconic/svg' },
            { from: './src/data', to: 'data' }
        ]),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ]
};
