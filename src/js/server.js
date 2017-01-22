import path from 'path'
import Express from 'express'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from 'store/configureStore'
import App from './app'
import { getItemData } from 'services';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

const app = Express();
const port = 8080;

// Use this middleware to set up hot module reloading via webpack.
// delete webpackConfig.devServer;
const webpackConfig = {
        devtool: 'inline-source-map',
        entry: [
            'webpack-hot-middleware/client',
            './src/js/app.bootstrap.js'
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'app.js',
            publicPath: '/'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([
                { from: './src/img', to: 'img' },
                { from: './build/css/app.css', to: 'css' },
                { from: './node_modules/open-iconic/svg', to: 'svg/open-iconic/svg' },
                { from: './src/data', to: 'data' }
            ]),
            new OpenBrowserPlugin({ url: 'http://localhost:8080' })
        ],
        module: {
            loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['react-hmre']
                }
            }]
        }
    }
    // console.log(webpackConfig);

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
    // noInfo: true,
    stats: { colors: true },

    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))


// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {

    // itemsFetchData(function(resData) {
    //     console.log(resData)
    // });

    // getItemData()
    //     .then(function(resData) {
    //         return resData.json();
    //     }).then(function(json) {
    //         console.log(json);
    //     });

    // Compile an initial state
    const preloadedState = {};

    // Create a new Redux store instance
    const store = configureStore(preloadedState)

    // Render the component to a string
    const html = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
    )

    // Grab the initial state from our Redux store
    const finalState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
}

function renderFullPage(html, preloadedState) {
    return `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <!-- Required meta tags always come first -->
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <link rel="stylesheet" href="css/app.css">
      </head>

      <body>
      <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
      <script src="app.js"></script>
      </body>

      </html>
    `
}

app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
})
